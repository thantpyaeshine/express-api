import type { RequestHandler, Request, Response, NextFunction } from 'express';

const handle = (middleware: RequestHandler, name?: string): RequestHandler =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await middleware(req, res, next);
        }
        catch (error) {
            console.error(`Error in ${middleware.name || name || 'unknown'} middleware:\n`, error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    };

export default handle;