import express from 'express';
const OpenAIRoute = express.Router();
import { handleConversation } from '../controllers/openai.js';

/**
 * POST /completion
 * Handles a conversation request, generates AI responses, and returns the updated conversation.
 */
OpenAIRoute.get('/completion', handleConversation);


export default OpenAIRoute;