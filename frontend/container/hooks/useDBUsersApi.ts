import { API_RESOURCE, BackendURL } from "@/constants/Uri";
import ApiError from "@/lib/ApiError";
import { useLogto } from "@logto/rn";

export const useDBUsersApi = () => {
    const { client } = useLogto();

    const api = async (
        path: string, 
        options: RequestInit = {}
    ) => {
        try { 
            // 檢查是否已驗證
            if (!await client.isAuthenticated()) {
                console.warn("[DB User Api] User not authenticated, skipping request");
                throw new Error("User not authenticated");
            }

            // 獲取 API 資源的存取令牌
            const token = await client.getAccessToken(API_RESOURCE);
            if (!token) {
                throw new ApiError("獲取存取令牌失敗", 401);  
            }
            const response = await fetch(`${BackendURL}${path}`, {
                ...options, 
                headers: {
                    'Content-Type': 'application/json',
                    // 將存取令牌添加到請求標頭
                    'Authorization': `Bearer ${token}`,
                    ...options.headers,
                },
            });

            let data;
            const contentType = response.headers.get("content-type");

            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
            } else {
                const DataText = await response.text(); // HTML 或其他格式
                data = { "message": DataText };
            }

            if (!response.ok){
                console.log(response)
                throw new ApiError(data.message || "伺服器錯誤", response.status, data);
            }
            
            return data;
        } catch (error) {
            console.log(error)
            throw error;
        }
    };

    const UpsertDBUser = async (userId: string, update?: any, create?: any) => {
        const response = await api(`/api/users`, {
            method: 'POST',
            body: JSON.stringify({ 
                id: userId,
                ...update,
                ...create
            })
        }).then((res) => {
            console.log("[DB User APi]", `${userId} upsert success`, res)
            return res;
        }).catch(error => { 
            console.error("[DB User APi]", `${userId} upsert fail`)
            throw error 
        })
        return response
    };

    return { UpsertDBUser };
};
