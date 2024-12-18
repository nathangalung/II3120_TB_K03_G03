import { Hono } from 'hono';
import { PaymentController } from '../controllers/payment';

const router = new Hono();

router.post('/create-transaction', PaymentController.createTransaction);

router.patch('/:transactionId', async (c) => {
    try {
        const transactionId = c.req.param('transactionId');
        const { status } = await c.req.json();

        const payment = await prisma.payment.update({
        where: { transactionId },
        data: { paymentStatus: status }
        });

        return c.json({ success: true, data: payment });
    } catch (error) {
        console.error('Error updating payment:', error);
        return c.json({ success: false, error: 'Failed to update payment' }, 500);
    }
});

export { router as paymentRoutes };