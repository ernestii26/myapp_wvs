import { RedirectUri } from "@/constants/Uri";
import { clearCache, loadFromCache, saveToCache } from "@/lib/cache";
import { handleError } from "@/lib/sendMessage";
import { useLogto, type IdTokenClaims } from "@logto/rn";
import { createContext, useContext, useEffect, useState } from "react";
import { useDBUsersApi } from "./useDBUsersApi";
import { useLogtoUsersApi } from "./useLogtoUsersApi";
// getIdTokenClaims
// sub：使用者識別碼
// name
// picture
// iss：Token發行者
// aud：Token接收者
// iat：簽發時間
// exp：到期時間
// auth_time：最近一次通過時間
// creat_at：建立帳號時間
// username：使用者名稱
type SocialContextType = {
    signIn: (redirectUri: string) => Promise<void>;
    signOut: () => Promise<void>;
    client: any;
    isAuthenticated: boolean;
    isInitialized: boolean;
    getIdTokenClaims: () => Promise<IdTokenClaims | undefined>;
    claims: IdTokenClaims;
    setClaims: React.Dispatch<React.SetStateAction<IdTokenClaims | undefined>>;
    user: any;
    setUser: React.Dispatch<React.SetStateAction<any>>;
    roles: any;
    setRoles: React.Dispatch<React.SetStateAction<any>>;
    LoadingSignIn: () => Promise<void>,
    InitDataSignOut: () => Promise<void>,
    loadingMessage: string | undefined;
    setLoadingMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
    initLoading: boolean;
    setInitLoading: React.Dispatch<React.SetStateAction<boolean>>
};

const SocialContext = createContext<SocialContextType | null>(null);

const SocialProvider = (props: any) => {
    const { signIn, signOut, client, isAuthenticated, isInitialized, getIdTokenClaims } = useLogto();
    const [claims, setClaims] = useState<IdTokenClaims>();
    const [user, setUser] = useState<any>();
    const [roles, setRoles] = useState<any>();
    const [loadingMessage, setLoadingMessage] = useState<string | undefined>(undefined);
    const [initLoading, setInitLoading] = useState<boolean>(false);

    const LoadingSignIn = async () => {
        setLoadingMessage("登入中");
        await signIn(RedirectUri).finally(() => {
            setLoadingMessage(undefined);
        });
    }

    const InitDataSignOut = async () => {
        setLoadingMessage("登出中");
        setClaims(undefined);
        setUser(undefined);
        setRoles(undefined);
        await clearCache();
        await signOut();
        setLoadingMessage(undefined);
    }

    const { GetLogtoUser, GetLogtoRoleToUsers } = useLogtoUsersApi();
    const { UpsertDBUser } = useDBUsersApi();

    useEffect(() => {
        const loadCachedData = async () => {
            console.log("[Social]", "Loading user data from cache")
            const cachedClaims = await loadFromCache<IdTokenClaims>("claims");
            const cachedUser = await loadFromCache<any>("user");
            const cachedRoles = await loadFromCache<any>("roles");
            console.log(cachedClaims)
            console.log(claims)
            if(cachedClaims != undefined && cachedClaims.sub != claims?.sub ){
                await clearCache();
                return;
            }
        
            if (cachedUser) setUser(cachedUser);
            if (cachedRoles) setRoles(cachedRoles);
        };
        if(isAuthenticated && claims)
            loadCachedData();
    }, [isAuthenticated, claims]);

    useEffect(() => { 
        const fetchAndSaveCacheData = async () => {
            console.log("[Social]", "Loading user data"); 
            setInitLoading(true);
            
            const newClaims = await getIdTokenClaims().then((res) => {
                setClaims(res);
                return res;
            }).catch(error=>{
                handleError(error, "無法取得用戶資料");
                return undefined;
            });
            console.log("[Social]", "get claims success");

            if (!newClaims?.sub)
                return
            await saveToCache("claims", newClaims);

            const newUser = await GetLogtoUser(newClaims?.sub).then((res) => {
                setUser(res);
                return res;
            }).catch(error => {
                handleError(error, "無法取得用戶資料");
                return undefined;
            });
            
            if (newUser) {
                await saveToCache("user", newUser);

                UpsertDBUser(newClaims?.sub, {
                    username: newUser.username,
                    avatar: newUser.avatar
                }, {
                    username: newUser.username,
                    avatar: newUser.avatar
                });
            }
            
            const newRoles = await GetLogtoRoleToUsers(newClaims?.sub).then((res) => {
                setRoles(res);
                return res;
            }).catch(error => {
                handleError(error, "無法取得用戶角色");
                return undefined;
            });
            
            if (newRoles) {
                await saveToCache("roles", newRoles);
            }

            setInitLoading(false);
        };
        if (isInitialized && isAuthenticated) {
            void fetchAndSaveCacheData();
        }
    }, [isAuthenticated, getIdTokenClaims, isInitialized]);

    return (
        <SocialContext.Provider
            value={{
                signIn, signOut, client, isAuthenticated, isInitialized, getIdTokenClaims, claims, setClaims, 
                user, setUser, roles, setRoles, LoadingSignIn, InitDataSignOut, loadingMessage, setLoadingMessage, initLoading, setInitLoading
            }}
            {...props}
        />
    );
};

const useSocial = () => {
    const context = useContext(SocialContext);
    if (!context) throw new Error("useSocial must be used within a SocialProvider");
    return context;
};
export { SocialProvider, useSocial };
