import { describe, expect, it, vi } from 'vitest';

import { protectSystem } from '@/middlewares/system.middleware';

describe('protectSystem', () => {
    it('passes the request to the next middleware', async () => {
        const next = vi.fn();

        await protectSystem({} as any, {} as any, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith();
    });
});
