import { Hono } from 'hono';
import prisma from '../config/prisma';

const router = new Hono();

router.get('/', async (c) => {
  try {
    const name = c.req.query('name');
    if (!name) {
      return c.json({ success: false, error: 'Kost name is required' }, 400);
    }

    const kost = await prisma.kost.findUnique({
      where: { name }
    });

    if (!kost) {
      return c.json({ success: false, error: 'Kost not found' }, 404);
    }

    return c.json({ 
      success: true, 
      data: {
        location: kost.location,
        rating: kost.rating
      }
    });
  } catch (error) {
    console.error('Error fetching kost:', error);
    return c.json({ success: false, error: 'Failed to fetch kost data' }, 500);
  }
});

router.get('/status/:userId', async (c) => {
  try {
    const userId = c.req.param('userId');
    const kostStatus = await prisma.kostStatus.findFirst({
      where: { userId },
      include: {
        kost: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  
    if (!kostStatus) {
      return c.json({ success: false, error: 'Kost status not found' }, 404);
    }
  
      // Calculate total cost including penalties
    const totalCost = kostStatus.monthlyPrice + 
      (kostStatus.paymentStatus === 'DELAYED' ? 
        (kostStatus.penaltyFee * (kostStatus.delayDays || 0)) : 0);
  
    return c.json({
      success: true,
      data: {
        monthlyPrice: kostStatus.monthlyPrice,
        penaltyFee: kostStatus.penaltyFee,
        paymentStatus: kostStatus.paymentStatus,
        delayDays: kostStatus.delayDays,
        continuousType: kostStatus.continuousType,
        totalCost
      }
    });
  } catch (error) {
    console.error('Error fetching kost status:', error);
    return c.json({ success: false, error: 'Failed to fetch kost status' }, 500);
  }
});
  
router.patch('/status/:userId/continuous', async (c) => {});

export { router as kostRoutes };