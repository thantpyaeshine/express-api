import type { MiddlewareHandler } from '@type/express';

const handle: MiddlewareHandler = (middleware, name) =>
    async (req, res, next) => {
        try {
            await middleware(req, res, next);
        }
        catch (error) {
            console.error(`Error in ${middleware.name || name || 'unknown'} middleware:\n`, error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    };

export default handle;