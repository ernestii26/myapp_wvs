const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// 中間件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 路由
const userRoutes = require('./routes/users');
const bookRoutes = require('./routes/books');
const postRoutes = require('./routes/posts');

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Backend API', version: '1.0.0' });
});

// API 路由
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/posts', postRoutes);

// 錯誤處理中間件
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});