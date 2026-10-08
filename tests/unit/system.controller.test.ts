import { describe, expect, it, jest } from '@jest/globals';
import { fileURLToPath } from 'url';

import { getLiveness, getStatus } from '@/controllers/system.controller';

describe('getLiveness', () => {
    it('returns a healthy status and timestamp', async () => {
        const response = { json: jest.fn() };

        await getLiveness({} as any, response as any, jest.fn() as any);

        expect(response.json).toHaveBeenCalledWith(
            expect.objectContaining({
                status: 'ok',
                timestamp: expect.any(String),
            }),
        );
    });
});

describe('getStatus', () => {
    it('sends the status page', () => {
        const response = { sendFile: jest.fn() };
        const expectedStatusPage = fileURLToPath(
            new URL('../../src/lib/status.html', import.meta.url),
        );

        getStatus({} as any, response as any, jest.fn() as any);

        expect(response.sendFile).toHaveBeenCalledWith(expectedStatusPage);
        expect(response.sendFile).toHaveBeenCalledTimes(1);
    });
});
