import { afterAll, beforeAll, describe, expect, it, jest } from '@jest/globals';
import express from 'express';
import type { Server } from 'node:http';

jest.unstable_mockModule('@lib/auth', () => ({
    auth: {},
}));

jest.unstable_mockModule('better-auth/node', () => ({
    toNodeHandler: () => async (
        request: express.Request,
        response: express.Response,
    ) => {
        if (request.path === '/error') {
            throw new Error('mock auth failure');
        }

        response.json({ ok: true });
    },
}));

const { default: app } = await import('@/app');

describe('Express app integration', () => {
    let server: Server;
    let baseUrl: string;

    beforeAll(async () => {
        server = await new Promise<Server>((resolve) => {
            const runningServer = app.listen(0, () => resolve(runningServer));
        });

        const address = server.address();
        if (!address || typeof address === 'string') {
            throw new Error('Test server did not expose a TCP address');
        }
        baseUrl = `http://127.0.0.1:${address.port}`;
    });

    afterAll(async () => {
        await new Promise<void>((resolve, reject) => {
            server.close((error) => (error ? reject(error) : resolve()));
        });
    });

    it('serves the root endpoint with an ISO timestamp', async () => {
        const response = await fetch(baseUrl);
        const body = await response.json() as { timestamp: string };

        expect(response.status).toBe(200);
        expect(Number.isNaN(Date.parse(body.timestamp))).toBe(false);
    });

    it('runs the system middleware and serves the health page', async () => {
        const response = await fetch(`${baseUrl}/system/health`);

        expect(response.status).toBe(200);
        expect(response.headers.get('content-type')).toContain('text/html');
        expect(await response.text()).toContain('API Status');
    });

    it('mounts the Better Auth handler under /auth', async () => {
        const response = await fetch(`${baseUrl}/auth/ok`);

        expect(response.status).toBe(200);
        await expect(response.json()).resolves.toEqual({ ok: true });
    });

    it('routes errors from the auth handler through centralized handling', async () => {
        const log = jest.spyOn(console, 'error').mockImplementation(() => {});
        const response = await fetch(`${baseUrl}/auth/error`);

        expect(response.status).toBe(500);
        await expect(response.json()).resolves.toEqual({
            message: 'Internal server error',
        });
        expect(log).toHaveBeenCalledWith(
            'Unhandled request error:',
            expect.any(Error),
        );
        log.mockRestore();
    });
});
