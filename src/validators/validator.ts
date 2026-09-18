import type { NextFunction, Request, Response } from 'express';
import type { ValidationChain } from 'express-validator';

export const validate = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const errors = [];

        for (const validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                errors.push(...result.array());
            }
        }

        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        next();
    };
};