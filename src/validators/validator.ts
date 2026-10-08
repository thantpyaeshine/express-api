import { ValidationHandler } from '@/types/express';

export const validate: ValidationHandler = (validations) =>
    async (req, res, next) => {
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