import { Hono } from 'hono';
import { OrderController } from '../controllers/order';
import { authMiddleware } from '../middlewares/auth';
import prisma from '../config/prisma';  // Add this import

const router = new Hono();

// Get user orders
router.get('/user/:userId', authMiddleware, async (c) => {
    try {
        const userId = c.req.param('userId');
        const orders = await prisma.order.findMany({
            where: { userId },
            include: {
                waterDeliveryHistories: true,
                laundryDeliveryHistories: true,
                cleaningServiceHistories: true,
            },
            orderBy: { 
                createdAt: 'desc' 
            }
        });

        return c.json({ 
            success: true, 
            data: orders.map(order => ({
                id: order.id,
                serviceType: order.serviceType,
                status: order.status,
                amount: order.amount,
                totalPrice: order.totalPrice,
                details: order.details,
                createdAt: order.createdAt,
                waterDeliveryHistory: order.waterDeliveryHistories[0],
                laundryDeliveryHistory: order.laundryDeliveryHistories[0],
                cleaningServiceHistory: order.cleaningServiceHistories[0]
            }))
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
        return c.json({ 
            success: false, 
            error: 'Failed to fetch orders',
            data: [] 
        }, 500);
    }
});

// Create order
router.post('/', authMiddleware, OrderController.createOrder);

// Update order status
router.patch('/:orderId/status', authMiddleware, async (c) => {
    try {
        const orderId = c.req.param('orderId');
        const { status } = await c.req.json();

        const order = await prisma.order.update({
            where: { id: orderId },
            data: { status }
        });

        return c.json({ 
            success: true, 
            data: order 
        });
    } catch (error) {
        console.error('Error updating order status:', error);
        return c.json({ 
            success: false, 
            error: 'Failed to update order status' 
        }, 500);
    }
});

export { router as orderRoutes };