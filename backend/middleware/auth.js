import { createRemoteJWKSet, decodeJwt, jwtVerify } from "jose";
import { API_RESOURCE, ISSUER, JWKS_URL } from "../constants/config.js";

const getTokenFromHeader = (headers) => {
    const { authorization } = headers;
    const bearerTokenIdentifier = "Bearer";

    if (!authorization) {
        throw new Error("Authorization header missing");
    }

    if (!authorization.startsWith(bearerTokenIdentifier)) {
        throw new Error("Authorization token type not supported");
    }

    return authorization.slice(bearerTokenIdentifier.length + 1);
};

const hasScopes = (tokenScopes, requiredScopes) => {
    if (!requiredScopes || requiredScopes.length === 0) {
        return true;
    }
    const scopeSet = new Set(tokenScopes);
    return requiredScopes.every((scope) => scopeSet.has(scope));
};

const verifyJwt = async (token) => {
    const JWKS = createRemoteJWKSet(new URL(JWKS_URL));

    const { payload } = await jwtVerify(token, JWKS, {
        issuer: ISSUER,
        audience: API_RESOURCE,
    }).catch(error => {
        const decoded = decodeJwt(token);
        console.log("Decoded JWT:", decoded);
        throw error;
    });

    return payload;
};

export const requireAuth = (requiredScopes = []) => {
    return async (req, res, next) => {
        try {
            // 提取令牌
            const token = getTokenFromHeader(req.headers);

            // 驗證令牌
            const payload = await verifyJwt(token);

            // 檢查權限範圍
            if (!hasScopes(payload.scope?.split(" "), requiredScopes)) {
                throw new Error("Insufficient scopes");
            }

            // 將用戶資訊附加到請求物件
            req.auth = {
                payload,
                token,
            };

            next();
        } catch (error) {
            console.error("Auth Error:", error.message);
            res.status(401).json({ error: "Unauthorized", message: error.message });
        }
    };
};
