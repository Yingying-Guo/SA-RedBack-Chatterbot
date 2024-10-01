import express from 'express';
const router = express.Router();
import { requestRate } from '../controllers/rl.controller.js';

// add a user
router.post('/submitFingerprint', requestRate);


export default router;