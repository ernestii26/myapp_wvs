/* Backend Config */
// Define API URL - Dynamically detect based on environment
// For Android Emulator use 'http://10.0.2.2:3000/api'
// For Physical Device (Hotspot/Wi-Fi): Use your computer's IP, e.g., 'http://192.168.137.122:3000/api'
// For iOS Simulator: Use 'http://localhost:3000/api' or your machine IP

// Backend Connection configuration
// You should use your IP!
export const BackendURL = 'http://10.5.2.62:3000';
export const API_BASE_URL = `${BackendURL}/api`;

/* Logto Config */
export const RedirectUri = 'wvs://callback';
export const ENDPOINT = 'https://m0xju1.logto.app';
export const LOGTO_API_BASE_URL = `${ENDPOINT}/api`;
export const API_RESOURCE = 'https://api.m0xju1.logto.app/api';
export const AppId = 'k57fns1jagvscm2mx4a3t';
