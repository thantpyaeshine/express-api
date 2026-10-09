import type { ControllerHandler } from '@type/express';

const handle: ControllerHandler = (controller) =>
    async (req, res, next) => {
        try {
            if (!controller) {
                return res.status(501).json({ message: 'Service unavailable.' });
            }
            await controller(req, res, next);
        }
        catch (error) {
            next(error);
        }
    };

export default handle;