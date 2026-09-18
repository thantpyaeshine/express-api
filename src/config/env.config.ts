import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

export const {
    // Configuration variables from the environment
    PORT = 3000,
    NODE_ENV = 'development',
    BETTER_AUTH_SECRET,
    AUTH_DB_URI,
} = process.env;

export const CLIENT_ORIGINS = JSON.parse(process.env.CLIENT_ORIGINS || '["http://localhost:3000"]');