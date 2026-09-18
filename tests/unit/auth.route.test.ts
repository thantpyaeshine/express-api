import { afterEach, describe, expect, it, jest } from '@jest/globals';
import express from 'express';
import type { Server } from 'node:http';

jest.unstable_mockModule('../../src/lib/auth.js', () => ({
    auth: {},
}));

jest.unstable_mockModule('better-auth/node', () => ({
    toNodeHandler: () => (_request: unknown, response: express.Response) =>
        response.json({ ok: true }),
}));

jest.unstable_mockModule('better-auth/client', () => ({
    createAuthClient: ({ baseURL, basePath }: { baseURL: string; basePath: string }) => ({
        $fetch: async (path: string) => {
            const response = await fetch(`${baseURL}${basePath}${path}`);
            return { data: await response.json() };
        },
    }),
}));

const servers: Server[] = [];

afterEach(async () => {
    await Promise.all(
        servers.splice(0).map(
            (server) =>
                new Promise<void>((resolve, reject) => {
                    server.close((error) => (error ? reject(error) : resolve()));
                }),
        ),
    );
});

describe('authRoutes', () => {
    it('serves the Better Auth health endpoint through the client', async () => {
        const { createAuthClient } = await import('better-auth/client');
        const { default: authRoutes } = await import('../../src/routes/auth.route.js');
        const app = express();
        app.use('/auth', authRoutes);

        const server = await new Promise<Server>((resolve) => {
            const runningServer = app.listen(0, () => resolve(runningServer));
        });
        servers.push(server);

        const address = server.address();
        if (!address || typeof address === 'string') {
            throw new Error('Test server did not expose a TCP address');
        }

        const client = createAuthClient({
            baseURL: `http://127.0.0.1:${address.port}`,
            basePath: '/auth',
        });
        const response = await client.$fetch('/ok');

        expect(response.data).toEqual({ ok: true });
    });
});