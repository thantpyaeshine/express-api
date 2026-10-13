import { config } from 'dotenv';
import { existsSync } from 'node:fs';
import { z } from 'zod';

const envs = {
    production: ['prod', 'production'],
    development: ['dev', 'development', 'local'],
    test: ['test'],
} as const satisfies Record<string, readonly string[]>;

const path = (
    [
        ...(envs[process.env.NODE_ENV as keyof typeof envs] ?? []),
        '',
    ]
        .map((name) => (name ? `.env.${name}` : '.env'))
        .find((filePath) => existsSync(filePath)) ?? '.env'
);

config({
    path,
});

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

    PORT: z.coerce.number().int().default(3000),

    BETTER_AUTH_SECRET: z.string().min(1, 'BETTER_AUTH_SECRET is required'),

    AUTH_DB_URI: z.string().min(1, 'AUTH_DB_URI is required'),

    CLIENT_ORIGINS: z
        .string()
        .default('[http://localhost:3000]')
        .transform((value) =>
            value
                .replace(/^\[|\]$/g, '')
                .split(',')
                .map((origin) => origin.trim()),
        )
        .pipe(z.array(z.url())),

});

const ENV = envSchema.parse(process.env);

export default ENV;
