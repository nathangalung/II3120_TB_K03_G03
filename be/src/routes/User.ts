import { Hono } from 'hono';
import { UserController } from '../controllers/user';
import { authMiddleware } from '../middlewares/auth';

const router = new Hono();

router.get('/me', authMiddleware, UserController.getUser);
router.patch('/:id', authMiddleware, UserController.updateUser);

export { router as userRoutes };