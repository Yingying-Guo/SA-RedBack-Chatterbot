import express, { json, urlencoded } from 'express';
import cors from 'cors';
import CryptoJS from 'crypto-js'; // 引入 CryptoJS 进行密码加密
import connectDB from '../Database/connection/db.connection.js';

// 路由导入
import DBRoute from "../Database/routes/db.route.js";
import OpenAIRoute from '../OpenAI/routes/openai.route.js';
import HeartbeatRoute from '../Heartbeat/routes/heartbeat.route.js';
import RateLimitRoute from '../RateLimit/routes/rl.route.js';
import { exportUserData, exportChatData, getUserDataCount, getChatDataCount } from '../Database/controllers/db.controller.js';

// 创建 Express 应用程序
const app = express();
const PORT = 3001;

// 中间件
app.use(json());
app.use(urlencoded({ extended: false }));

// 允许跨域请求
app.use(cors({
    origin: ['http://127.0.0.1:5173', 'http://localhost:5173'] // 允许从前端的端口 3000 进行请求
}));

// 数据库连接
connectDB();

// 路由定义
app.use("/db", DBRoute);          // 数据库相关 API
app.use("/openai", OpenAIRoute);  // OpenAI 相关 API
app.use("/heartbeat", HeartbeatRoute); // 心跳检测 API
app.use("/rate_limit", RateLimitRoute); // 速率限制 API

// 导出数据的 API
app.get('/api/admin/export/users', exportUserData);
app.get('/api/admin/export/chats', exportChatData);
app.get('/api/admin/export/users/count', getUserDataCount);
app.get('/api/admin/export/chats/count', getChatDataCount);

// 假设后端存储的哈希密码
const correctHashedPassword = CryptoJS.SHA256("admin123").toString(CryptoJS.enc.Hex);

// 验证密码
app.post("/api/verify-password", (req, res) => {
  const { password } = req.body;

  // 验证传来的密码哈希是否与正确密码匹配
  if (password === correctHashedPassword) {
    return res.status(200).json({ success: true });
  } else {
    return res.status(401).json({ success: false });
  }
});

// 服务器监听
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
