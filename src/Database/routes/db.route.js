import express from 'express';
const router = express.Router();
import { createUser, createOpenAIChat, getOpenAIChatByUser } from '../controllers/db.controller.js';

// add a user
router.post('/user-info', createUser);

// add a chat record
router.post('/chat', createOpenAIChat);

// get chat record by user
router.get('/:userID', getOpenAIChatByUser);

export default router;
