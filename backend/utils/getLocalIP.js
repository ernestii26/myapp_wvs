import os from 'os';

/**
 * 取得本機的本地 IPv4 地址（非 localhost）
 * @returns {string} IPv4 地址
 */
export const getLocalIP = () => {
  const interfaces = os.networkInterfaces();
  
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // 跳過內部和非 IPv4 地址
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  
  return 'localhost'; // 如果找不到，則返回 localhost
};

/**
 * 產生 API Base URL
 * @param {number} port - 伺服器埠口
 * @param {boolean} useHttps - 是否使用 HTTPS
 * @returns {string} 完整的 API Base URL
 */
export const getApiBaseUrl = (port = 3000, useHttps = false) => {
  const protocol = useHttps ? 'https' : 'http';
  const ip = getLocalIP();
  return `${protocol}://${ip}:${port}`;
};
