import type { EnvironmentVariables } from '@type/env';
import { config } from 'dotenv';
import { existsSync } from 'node:fs';

config({ path: existsSync('.env') ? '.env' : `.env.${process.env.NODE_ENV || 'development'}` });

const env = process.env as unknown as EnvironmentVariables;

export default env;
