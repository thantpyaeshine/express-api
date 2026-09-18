import { body } from "express-validator";
import { validate } from "./validator.js";

export const validateSystem = validate([
    body('dummyField').notEmpty().withMessage('dummyField is required'),
    body('dummyData').equals('dummyData').withMessage('dummyData must be "dummyData"')
]);