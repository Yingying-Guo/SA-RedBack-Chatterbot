// heartbeat.route.js
import express from 'express';
import { handleHeartbeat } from '../controllers/heartbeat.controller.js';  // Import the controller

const router = express.Router();

/**
 * GET /
 * Route to check if the server is operational by using the handleHeartbeat controller.
 */
router.get('/', handleHeartbeat);

export default router;