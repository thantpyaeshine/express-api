import app from '@/app';
import ENV from '@config/env';

const { PORT } = ENV;

try {
    app.listen(PORT, () => {
        console.log(`Server is listening on port:${PORT}`);
    });
} catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
}