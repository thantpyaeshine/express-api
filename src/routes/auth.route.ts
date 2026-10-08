import express from 'express';
import { auth } from '@lib/auth';
import { toNodeHandler } from 'better-auth/node';

const router = express.Router();

router.all("/{*any}", toNodeHandler(auth));

export default router;