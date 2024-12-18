import { Hono } from 'hono';
import { UserController } from '../controllers/user';
import { authMiddleware } from '../middlewares/auth';

const router = new Hono();

router.get('/me', authMiddleware, UserController.getUser);

export { router as userRoutes };