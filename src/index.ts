import app from '@/app';
import ENV from '@config/env';
import { authDatabase } from '@lib/auth';

const { PORT } = ENV;

try {
    const server = app.listen(PORT, () => {
        console.log(`Server is listening on port:${PORT}`);
    });

    let shuttingDown = false;
    const shutdown = (signal: NodeJS.Signals) => {
        if (shuttingDown) {
            return;
        }
        shuttingDown = true;

        console.log(`${signal} received; closing server`);
        server.close((serverError) => {
            if (serverError) {
                console.error('Failed to close HTTP server:', serverError);
                process.exitCode = 1;
            }

            void authDatabase.end()
                .then(() => console.log('Database connections closed'))
                .catch((error: unknown) => {
                    console.error('Failed to close database connections:', error);
                    process.exitCode = 1;
                });
        });
    };

    process.once('SIGINT', () => shutdown('SIGINT'));
    process.once('SIGTERM', () => shutdown('SIGTERM'));
} catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
}