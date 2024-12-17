import { Hono } from 'hono';
import userRoutes from './routes/userRoutes';
import { authMiddleware } from './middlewares/authMiddleware';

const app = new Hono();

app.use('/users', authMiddleware);  // Example usage of middleware
app.route('/users', userRoutes);    // Attach user routes

app.listen(3000);