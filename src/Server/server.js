import express, { json, urlencoded } from 'express';
import cors from 'cors';
import connectDB from '../Database/connection/db.connection.js';

// Importing routes
import DBRoute from "../Database/routes/db.route.js";
import OpenAIRoute from '../OpenAI/routes/openai.route.js';
import HeartbeatRoute from '../Heartbeat/routes/heartbeat.route.js';
import RateLimitRoute from '../RateLimit/routes/rl.route.js';

// Create an Express application
const app = express();
const PORT = 3001;

// Middleware
app.use(json());
app.use(cors()); // allow all origins
app.use(urlencoded({ extended: false }));

// Database connection
connectDB();

// Define routes
app.use("/db", DBRoute);          // Database-related API
app.use("/openai", OpenAIRoute);  // OpenAI-related API
app.use("/heartbeat", HeartbeatRoute); // Heartbeat check API
app.use("/rate_limit", RateLimitRoute); // Rate limit API

// Server listening
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
