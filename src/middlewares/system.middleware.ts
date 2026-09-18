import handle from './handle.middleware.js';

export const protectSystem = handle(
    async (req, res, next) => {
        // System protection logics
        next();
    }
    , 'protectSystem'
);