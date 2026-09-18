import { describe, expect, it, jest } from '@jest/globals';
import { fileURLToPath } from 'url';

import { getStatus } from '../../src/controllers/system.controller.js';

describe('getStatus', () => {
    it('sends the status page', () => {
        const response = { sendFile: jest.fn() };
        const expectedStatusPage = fileURLToPath(
            new URL('../../src/lib/status.html', import.meta.url),
        );

        getStatus({} as any, response as any);

        expect(response.sendFile).toHaveBeenCalledWith(expectedStatusPage);
        expect(response.sendFile).toHaveBeenCalledTimes(1);
    });
});
