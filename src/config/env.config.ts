import { config } from 'dotenv';
import { existsSync } from 'node:fs';
import { z } from 'zod';

const envFile = existsSync('.env')
    ? '.env'
    : `.env.${process.env.NODE_ENV ?? 'development'}`;

config({ path: envFile });

const envSchema = z
    .object({
        NODE_ENV: z.string().default('development'),
        PORT: z.coerce.number().int().min(1).max(65535).default(3000),
        CLIENT_ORIGINS: z
            .string()
            .default('["http://localhost:3000"]')
            .transform((value, context) => {
                try {
                    const origins = z.array(z.url()).safeParse(JSON.parse(value));

                    if (origins.success) {
                        return origins.data;
                    }
                } catch {
                    // Invalid JSON is reported as a CLIENT_ORIGINS validation error.
                }

                context.addIssue({
                    code: 'custom',
                    message: 'Must be a JSON array of valid URLs',
                });
                return z.NEVER;
            }),
        BETTER_AUTH_SECRET: z.string().min(32),
        AUTH_DB_URI: z.string().min(1),
        BETTER_AUTH_URL: z.url().optional(),
    })
    .transform(({ BETTER_AUTH_URL, ...env }) => ({
        ...env,
        BETTER_AUTH_URL: BETTER_AUTH_URL ?? `http://localhost:${env.PORT}`,
    }));

export type Environment = z.infer<typeof envSchema>;

export function parseEnvironment(input: NodeJS.ProcessEnv): Environment {
    const result = envSchema.safeParse(input);

    if (!result.success) {
        const details = result.error.issues
            .map(({ path, message }) => `- ${path.join('.')}: ${message}`)
            .join('\n');

        throw new Error(`Invalid environment configuration:\n${details}`);
    }

    return result.data;
}

const ENV = parseEnvironment(process.env);

export default ENV;