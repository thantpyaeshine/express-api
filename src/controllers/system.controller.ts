import type { Response, Request } from 'express';
import { matchedData } from 'express-validator/lib/matched-data.js';
import { fileURLToPath } from 'url';

export const getStatus = (req: Request, res: Response) => {
    res.sendFile(fileURLToPath(new URL('../lib/status.html', import.meta.url)));
};