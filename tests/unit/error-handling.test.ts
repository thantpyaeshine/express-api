import { afterEach, describe, expect, it, jest } from '@jest/globals';

import handleController from '@/controllers/handler.controller';
import handleMiddleware from '@/middlewares/handler.middleware';
import errorHandler from '@/middlewares/error.middleware';

describe('error forwarding', () => {
    it('forwards controller errors to Express', async () => {
        const error = new Error('controller failed');
        const next = jest.fn();
        const handler = handleController(async () => {
            throw error;
        });

        await handler({} as any, {} as any, next);

        expect(next).toHaveBeenCalledWith(error);
    });

    it('forwards middleware errors to Express', async () => {
        const error = new Error('middleware failed');
        const next = jest.fn();
        const handler = handleMiddleware(async () => {
            throw error;
        });

        await handler({} as any, {} as any, next);

        expect(next).toHaveBeenCalledWith(error);
    });
});

describe('errorHandler', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('logs the error and returns a generic response', () => {
        const error = new Error('internal detail');
        const response = {
            headersSent: false,
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
        jest.spyOn(console, 'error').mockImplementation(() => {});

        errorHandler(error, {} as any, response as any, next);

        expect(console.error).toHaveBeenCalledWith('Unhandled request error:', error);
        expect(response.status).toHaveBeenCalledWith(500);
        expect(response.json).toHaveBeenCalledWith({
            message: 'Internal server error',
        });
        expect(next).not.toHaveBeenCalled();
    });

    it('delegates errors when response headers were already sent', () => {
        const error = new Error('stream failed');
        const next = jest.fn();
        const response = { headersSent: true };

        errorHandler(error, {} as any, response as any, next);

        expect(next).toHaveBeenCalledWith(error);
    });
});
