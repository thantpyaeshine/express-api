import handle from '@controller/handler';
import { getLiveness, getStatus } from '@controller/system';
import { protectSystem } from '@middleware/system';
import express from 'express';

const router = express.Router();

router.get('/live', handle(getLiveness));
router.get('/health', protectSystem, handle(getStatus));

export default router;