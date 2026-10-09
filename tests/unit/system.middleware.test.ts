import { describe, expect, it, jest } from '@jest/globals';

import { protectSystem } from '@/middlewares/system.middleware';

describe('protectSystem', () => {
    it('passes the request to the next middleware', async () => {
        const next = jest.fn();

        await protectSystem({} as any, {} as any, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith();
    });
});
