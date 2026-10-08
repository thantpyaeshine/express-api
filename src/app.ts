import app from '@config/app';
import authRoutes from '@route/auth';
import systemRoutes from '@route/system';

app.get('/', ({ res }: { res: any }) =>
    res.json({ timestamp: new Date().toISOString() })
);

app.use('/system', systemRoutes);
app.use('/auth', authRoutes);

export default app;