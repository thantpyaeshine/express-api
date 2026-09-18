import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import type { Request, Response } from 'express';
import express from 'express';
import morgan from 'morgan';
import { PORT, CLIENT_ORIGINS } from './config/env.config.js';
import systemRoutes from './routes/system.route.js';
import authRoutes from './routes/auth.route.js';


const app = express();
dotenv.config();

const env = process.env.NODE_ENV || 'development';

app.use(
    cors({
        origin: CLIENT_ORIGINS,
        credentials: true,
    })
);
app.use(morgan(env === 'production' ? 'combined' : 'dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_: Request, res: Response) =>
    res.json({ timestamp: new Date().toISOString() })
);

app.use('/system', systemRoutes);
app.use('/auth', authRoutes);

try {
    app.listen(PORT, () => {
        console.log(`Server is listening on port:${PORT}`);
    });
} catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
}