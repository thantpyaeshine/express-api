import type { MiddlewareHandler } from '@type/express';

const handle: MiddlewareHandler = (middleware) =>
    async (req, res, next) => {
        try {
            await middleware(req, res, next);
        }
        catch (error) {
            next(error);
        }
    };

export default handle;