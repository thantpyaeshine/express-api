import type { Controller } from '@type/express';
import { fileURLToPath } from 'url';

export const getStatus: Controller = async (req, res) => {
    res.sendFile(fileURLToPath(new URL('../lib/status.html', import.meta.url)));
};