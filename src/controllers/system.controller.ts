import type { Controller } from '@type/express';
import { fileURLToPath } from 'url';

export const getLiveness: Controller = async (_req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
    });
};

export const getStatus: Controller = async (req, res) => {
    res.sendFile(fileURLToPath(new URL('../lib/status.html', import.meta.url)));
};