import express from 'express';
import { getStatus } from '../controllers/system.controller.js';
import handle from '../controllers/handle.controller.js';
import { protectSystem } from '../middlewares/system.middleware.js';

const router = express.Router();

router.get('/health', protectSystem, handle(getStatus));

export default router;