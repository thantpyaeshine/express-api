import handle from '@controller/handler';
import { getStatus } from '@controller/system';
import { protectSystem } from '@middleware/system';
import express from 'express';

const router = express.Router();

router.get('/health', protectSystem, handle(getStatus));

export default router;