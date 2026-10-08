import type { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (error, _req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }

    console.error('Unhandled request error:', error);
    res.status(500).json({ message: 'Internal server error' });
};

export default errorHandler;
