import { Router } from "express";
import AllowAdminEmail from "../constants/allowEmail.js";
import { ENDPOINT, RoleNameToId } from "../constants/config.js";
import { requireAuth } from "../middleware/auth.js";
import fetchAccessToken from "../utils/token.js";

const router = Router();

// Helper to convert role names to IDs
const getRoleIds = (roles) => {
    const ids = [];
    for(let role of roles){
        let id = RoleNameToId[role];
        if(id != undefined)
            ids.push(id)
    }
    return ids;
}

const GetUser = async (req, res) => {
    const userId = req.params.userId
    const adminAccessToken = await fetchAccessToken();
    const userRes = await fetch(`${ENDPOINT}/api/users/${userId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${adminAccessToken}`,
            'Content-Type': 'application/json',
        }
    });
    const data = await userRes.json()
    res.status(userRes.status).json(data);
}

const UpdateUser = async (req, res) => {
    const { userData } = req.body;
    const userId = req.params.userId;
    const adminAccessToken = await fetchAccessToken();
    const userRes = await fetch(`${ENDPOINT}/api/users/${userId}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${adminAccessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    const data = await userRes.json();
    res.status(userRes.status).json(data);
}

const GetUserCustomData = async (req, res) => {
    const userId = req.params.userId;
    const adminAccessToken = await fetchAccessToken();
    const userRes = await fetch(`${ENDPOINT}/api/users/${userId}/custom-data`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${adminAccessToken}`,
            'Content-Type': 'application/json',
        }
    });
    const data = await userRes.json()
    res.status(userRes.status).json(data);
}

const UpdateUserCustomData = async (req, res) => {
    const { customData } = req.body;
    const userId = req.params.userId;
    const adminAccessToken = await fetchAccessToken();
    const userRes = await fetch(`${ENDPOINT}/api/users/${userId}/custom-data`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${adminAccessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "customData": customData,
        }),
    });
    const data = await userRes.json();
    res.status(userRes.status).json(data);
}

const GetRoleToUsers = async (req, res) => {
    const userId = req.params.userId
    const adminAccessToken = await fetchAccessToken();
    const userRes = await fetch(`${ENDPOINT}/api/users/${userId}/roles`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${adminAccessToken}`,
            'Content-Type': 'application/json',
        }
    });
    const data = await userRes.json()
    res.status(userRes.status).json(data);
}

const UpdateRoleToUsers = async (req, res) => {
    const {roles, email} = req.body;
    if (roles.includes('Admin') && (!email || !AllowAdminEmail.includes(email)))
            return res.sendStatus(403);
    const userId = req.params.userId;
    const adminAccessToken = await fetchAccessToken();
    const roleIds = getRoleIds(roles);
    const userRes = await fetch(`${ENDPOINT}/api/users/${userId}/roles`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${adminAccessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "roleIds": roleIds,
        }),
    });
    res.sendStatus(userRes.status);
}

const AssignRoleToUsers = async (req, res) => {
    const {roles, email} = req.body;
    if (roles.includes('Admin') && (!email || !AllowAdminEmail.includes(email)))
            return res.sendStatus(403);
    const userId = req.params.userId;
    const adminAccessToken = await fetchAccessToken();
    const roleIds = getRoleIds(roles);
    const userRes = await fetch(`${ENDPOINT}/api/users/${userId}/roles`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${adminAccessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "roleIds": roleIds,
        }),
    });
    res.sendStatus(userRes.status);
}

router.get("/:userId", requireAuth(), GetUser);
router.patch("/:userId", requireAuth(), UpdateUser);
router.get("/:userId/custom-data", requireAuth(), GetUserCustomData);
router.patch("/:userId/custom-data", requireAuth(), UpdateUserCustomData);
router.get("/:userId/roles", requireAuth(), GetRoleToUsers);
router.put("/:userId/roles", requireAuth(), UpdateRoleToUsers);
router.post("/:userId/roles", requireAuth(), AssignRoleToUsers);

export default router;
