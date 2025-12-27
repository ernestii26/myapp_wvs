// Define API URL - Dynamically detect based on environment
// For Android Emulator use 'http://10.0.2.2:3000/api'
// For Physical Device (Hotspot/Wi-Fi): Use your computer's IP, e.g., 'http://192.168.137.122:3000/api'
// For iOS Simulator: Use 'http://localhost:3000/api' or your machine IP

// 後端會自動偵測並返回正確的 IP 地址
// 或者直接設定為你的電腦 IP（確保與後端一致）
export const API_BASE_URL = 'http://172.20.10.5:3000/api';
