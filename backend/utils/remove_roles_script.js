import fetchAccessToken from "./token.js";
import { ENDPOINT } from "../constants/config.js";

const userId = "pso51rktn503";

const removeRoles = async () => {
    try {
        console.log(`Fetching access token...`);
        const adminAccessToken = await fetchAccessToken();
        console.log(`Access token fetched.`);

        console.log(`Removing roles for user ${userId}...`);
        const userRes = await fetch(`${ENDPOINT}/api/users/${userId}/roles`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${adminAccessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "roleIds": [], // Empty array to remove all roles
            }),
        });

        if (userRes.ok) {
            console.log(`Successfully removed roles for user ${userId}.`);
        } else {
            console.error(`Failed to remove roles. Status: ${userRes.status}`);
            const data = await userRes.text();
            console.error(data);
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
};

removeRoles();
