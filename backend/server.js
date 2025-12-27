import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { ConnectDB, DisconnectDB } from './config/database.js';
import { API_BASE_URL, PORT } from './constants/config.js';
import errorHandler from './middleware/errorHandler.js';
import bookRoutes from './routes/books.js';
import logtoUserRoutes from './routes/logtoUsers.js';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// 改進的 CORS 設定 - 允許所有來源在開發環境
const corsOptions = {
  origin: '*', // 在開發環境允許所有來源，生產環境應該限制
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// 連接資料庫
ConnectDB();

// 中間件
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 配置端點 - 提供前端需要的配置資訊
app.get('/config', (req, res) => {
  res.json({
    apiBaseUrl: API_BASE_URL,
    port: PORT,
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Backend API', 
    version: '1.0.0',
    apiBaseUrl: API_BASE_URL 
  });
});

// API 路由
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/logto/users', logtoUserRoutes);

// 錯誤處理中間件
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`Server running on ${API_BASE_URL}`);
  console.log(`Frontend can connect to: ${API_BASE_URL}`);
});

// 處理未捕捉的 Promise Rejection (Unhandled Promise Rejection)
// 這是當非同步操作失敗（例如資料庫連線斷開）但沒有被 catch 捕捉時觸發
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  console.log('Shutting down the server due to Unhandled Promise Rejection');
  // 優雅地關閉伺服器，處理完現有請求後再停止
  server.close(async () => {
    await DisconnectDB();
    process.exit(1);
  });
});

// 處理未捕捉的異常 (Uncaught Exception)
// 這是當同步程式碼發生錯誤（例如引用未定義變數）且沒有被 try-catch 捕捉時觸發
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  console.log('Shutting down the server due to Uncaught Exception');
  process.exit(1);
});

// 處理 SIGTERM 信號 (例如 Heroku, Kubernetes, Docker 停止容器時發送)
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully');
  server.close(async () => {
    console.log('Process terminated');
    await DisconnectDB();
    process.exit(0);
  });
});