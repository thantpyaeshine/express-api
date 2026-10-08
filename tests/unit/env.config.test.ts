import { describe, expect, it } from '@jest/globals';

const envKeys = [
    'NODE_ENV',
    'PORT',
    'CLIENT_ORIGINS',
    'BETTER_AUTH_SECRET',
    'AUTH_DB_URI',
    'BETTER_AUTH_URL',
] as const;
const originalEnv = Object.fromEntries(
    envKeys.map((key) => [key, process.env[key]]),
);

Object.assign(process.env, {
    NODE_ENV: 'test',
    PORT: '3000',
    CLIENT_ORIGINS: '["http://localhost:3000"]',
    BETTER_AUTH_SECRET: 'test-secret-that-is-at-least-32-characters',
    AUTH_DB_URI: '******localhost:5432/test',
    BETTER_AUTH_URL: 'http://localhost:3000',
});

const { parseEnvironment } = await import('@config/env');

for (const key of envKeys) {
    const value = originalEnv[key];
    if (value === undefined) {
        delete process.env[key];
    } else {
        process.env[key] = value;
    }
}

describe('parseEnvironment', () => {
    it('parses values and applies defaults', () => {
        const env = parseEnvironment({
            NODE_ENV: 'test',
            BETTER_AUTH_SECRET: 'a'.repeat(32),
            AUTH_DB_URI: '******localhost:5432/test',
        });

        expect(env).toMatchObject({
            NODE_ENV: 'test',
            PORT: 3000,
            CLIENT_ORIGINS: ['http://localhost:3000'],
            BETTER_AUTH_URL: 'http://localhost:3000',
        });
    });

    it('parses custom port, origins, and auth URL', () => {
        const env = parseEnvironment({
            PORT: '4000',
            CLIENT_ORIGINS: '["https://example.com"]',
            BETTER_AUTH_SECRET: 'a'.repeat(32),
            AUTH_DB_URI: '******localhost:5432/test',
            BETTER_AUTH_URL: 'https://api.example.com',
        });

        expect(env.PORT).toBe(4000);
        expect(env.CLIENT_ORIGINS).toEqual(['https://example.com']);
        expect(env.BETTER_AUTH_URL).toBe('https://api.example.com');
    });

    it('reports invalid environment values', () => {
        expect(() =>
            parseEnvironment({
                PORT: 'not-a-port',
                CLIENT_ORIGINS: 'not-json',
                BETTER_AUTH_SECRET: 'short',
                AUTH_DB_URI: '',
            }),
        ).toThrow(/Invalid environment configuration/);
    });
});
