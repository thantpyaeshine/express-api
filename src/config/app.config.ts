import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import ENV from '@config/env';

const { CLIENT_ORIGINS, NODE_ENV } = ENV;

const app = express();

app.use(
    cors({
        origin: CLIENT_ORIGINS,
        credentials: true,
    })
);
app.use(morgan(NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export default app;