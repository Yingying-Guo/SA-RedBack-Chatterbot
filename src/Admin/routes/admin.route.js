import express from 'express';
const router = express.Router();
import { exportUserData, exportChatData, getUserDataCount, getChatDataCount, authenticateAdmin } from '../controllers/admin.controller.js';

// API for exporting data
router.get('/export/users', exportUserData);
router.get('/export/chats', exportChatData);
router.get('/export/users/count', getUserDataCount);
router.get('/export/chats/count', getChatDataCount);
router.post("/verify-password", authenticateAdmin);

export default router;
