import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

// 初始化 Prisma Client，並根據環境設定日誌等級
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  log: 
    process.env.NODE_ENV === "development"
      ? ['query', 'info', 'warn', 'error']
      : ['warn', 'error'],
});

// 連接資料庫函式
export const ConnectDB = async () => {
  try {
    await prisma.$connect();
    console.log("資料庫連接成功");
  } catch (error) {
    console.error("資料庫連接失敗:", error);
    process.exit(1); // 連接失敗時結束程式
  }
};

// 斷開資料庫連線函式
export const DisconnectDB = async () => {
  try {
    await prisma.$disconnect();
    console.log("資料庫連接已關閉");
  } catch (error) {
    console.error("關閉資料庫連接時出錯:", error);
  }
};

export default prisma;