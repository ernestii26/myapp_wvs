import { getApiBaseUrl } from '../utils/getLocalIP.js';
//*
const ENDPOINT = 'https://m0xju1.logto.app';
const PORT = process.env.PORT || 3000;
const API_BASE_URL = process.env.API_BASE_URL || getApiBaseUrl(PORT, false);
const API_RESOURCE = 'https://api.m0xju1.logto.app/api';
const JWKS_URL = 'https://m0xju1.logto.app/oidc/jwks';
const ISSUER = 'https://m0xju1.logto.app/oidc';
const TOKEN_POINT = `${ENDPOINT}/oidc/token`;
const M2MId = '89wai0xiokse8e9r5atj9';
const M2MSecret = 'Exrgh5T6Gnb5dpaPKGwPwhfQVhS5R7dm';
const AppId = 'k57fns1jagvscm2mx4a3t';
//*/
// New Logto App Config
/*
const ENDPOINT = 'https://v4ca8w.logto.app';
const PORT = process.env.PORT || 3000;
const API_BASE_URL = process.env.API_BASE_URL || getApiBaseUrl(PORT, false);
const API_RESOURCE = 'https://v4ca8w.logto.app/api';
const JWKS_URL = 'https://v4ca8w.logto.app/oidc/jwks';
const ISSUER = 'https://v4ca8w.logto.app/oidc';
const TOKEN_POINT = `${ENDPOINT}/oidc/token`;
const M2MId = 'wpm26qa4b0ww57q9zimdt';
const M2MSecret = 'IcfR7xqucypvaUzdeWylGl3HTVTI26Uu';
const AppId = 'wpm26qa4b0ww57q9zimdt';
*/

const RoleNameToId = {
    'User': 'v677df9f2bjfiqhujnstq',
    'Admin': '09ugt1b4tckooa7wpiei8',
    'Handsome_guy': 'nzrjz9me3qurkfwbrly3h'
};
const PostsTake = 10;

export {
    API_BASE_URL,
    API_RESOURCE, AppId, ENDPOINT, ISSUER, JWKS_URL, M2MId,
    M2MSecret, PORT, PostsTake, RoleNameToId, TOKEN_POINT
};

