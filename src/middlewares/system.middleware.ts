import handle from '@middleware/handler';
import type { Middleware } from '@type/express';

export const protectSystem: Middleware = handle(
    async (_req, _res, next) => {
        // System protection logics
        next();
    }
);