import app from '@config/app';
import authRoutes from '@route/auth';
import systemRoutes from '@route/system';
import errorHandler from '@middleware/error';

app.get('/', ({ res }: { res: any }) =>
    res.json({ timestamp: new Date().toISOString() })
);

app.use('/system', systemRoutes);
app.use('/auth', authRoutes);
    
app.use(errorHandler);
    
export default app;