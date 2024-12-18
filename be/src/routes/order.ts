import { Hono } from 'hono';
import { OrderController } from '../controllers/order';
import { authMiddleware } from '../middlewares/auth';

const router = new Hono();

router.post('/', authMiddleware, OrderController.createOrder);
router.get('/user/:userId', authMiddleware, OrderController.getOrders);

router.patch('/:orderId/status', async (c) => {
    try {
        const orderId = c.req.param('orderId');
        const { status } = await c.req.json();

        const order = await prisma.order.update({
        where: { id: orderId },
        data: { status }
        });

        return c.json({ success: true, data: order });
    } catch (error) {
        console.error('Error updating order status:', error);
        return c.json({ success: false, error: 'Failed to update order status' }, 500);
    }
});

export { router as orderRoutes };