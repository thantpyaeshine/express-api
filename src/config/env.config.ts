import type { EnvironmentVariables } from '@type/env';
import { config } from 'dotenv';
import { existsSync } from 'node:fs';

config({ path: existsSync('.env') ? '.env' : `.env.${process.env.NODE_ENV || 'development'}` });

const env = process.env as unknown as EnvironmentVariables;

if (typeof env.CLIENT_ORIGINS === 'string') {
    env.CLIENT_ORIGINS = env.CLIENT_ORIGINS.split(',').map(origin => origin.trim());
}

export default env;