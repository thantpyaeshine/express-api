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
            console.error(`Error in ${controller?.name || 'unknown'} controller:\n`, error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    };

export default handle;