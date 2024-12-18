import { Hono } from 'hono';
import { PaymentController } from '../controllers/payment';

const router = new Hono();

router.post('/create-transaction', PaymentController.createTransaction);

export { router as paymentRoutes };