import { Hono } from 'hono';
import { AuthController } from '../controllers/auth';

const router = new Hono();

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);

export { router as authRoutes };