import express, { json, urlencoded } from 'express';
import cors from 'cors';
import CryptoJS from 'crypto-js'; // Import CryptoJS for password encryption
import connectDB from '../Database/connection/db.connection.js';

// Importing routes
import DBRoute from "../Database/routes/db.route.js";
import OpenAIRoute from '../OpenAI/routes/openai.route.js';
import HeartbeatRoute from '../Heartbeat/routes/heartbeat.route.js';
import RateLimitRoute from '../RateLimit/routes/rl.route.js';
import { exportUserData, exportChatData, getUserDataCount, getChatDataCount } from '../Database/controllers/db.controller.js';

// Create an Express application
const app = express();
const PORT = 3001;

// Middleware
app.use(json());
app.use(urlencoded({ extended: false }));

// Allow cross-origin requests
app.use(cors({
    origin: ['http://127.0.0.1:5173', 'http://localhost:5173'] // Allow requests from the frontend port
}));

// Database connection
connectDB();

// Define routes
app.use("/db", DBRoute);          // Database-related API
app.use("/openai", OpenAIRoute);  // OpenAI-related API
app.use("/heartbeat", HeartbeatRoute); // Heartbeat check API
app.use("/rate_limit", RateLimitRoute); // Rate limit API

// API for exporting data
app.get('/api/admin/export/users', exportUserData);
app.get('/api/admin/export/chats', exportChatData);
app.get('/api/admin/export/users/count', getUserDataCount);
app.get('/api/admin/export/chats/count', getChatDataCount);

// Hashed password stored on the backend
const correctHashedPassword = CryptoJS.SHA256("admin123").toString(CryptoJS.enc.Hex);

// Password verification
app.post("/api/verify-password", (req, res) => {
  const { password } = req.body;

  // Check if the hashed password sent matches the correct hashed password
  if (password === correctHashedPassword) {
    return res.status(200).json({ success: true });
  } else {
    return res.status(401).json({ success: false });
  }
});

// Server listening
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
