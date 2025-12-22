// 資料庫連接設定
// 後續可根據選擇的資料庫進行配置（MongoDB, PostgreSQL, SQLite 等）

module.exports = {
  development: {
    host: 'localhost',
    port: 27017,
    database: 'myapp'
  },
  production: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
  }
};
