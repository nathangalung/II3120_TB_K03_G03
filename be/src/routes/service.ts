import { Hono } from 'hono';
import prisma from '../config/prisma';

const router = new Hono();

router.get('/water', async (c) => {
  try {
    const waterServices = await prisma.waterDelivery.findMany({
      orderBy: {
        price: 'asc'
      }
    });
    return c.json({ success: true, data: waterServices });
  } catch (error) {
    console.error('Water service error:', error);
    return c.json({ success: false, error: 'Failed to fetch water services' }, 500);
  }
});

router.get('/laundry', async (c) => {
  try {
    const laundryServices = await prisma.laundryDelivery.findMany({
      orderBy: {
        clothPrice: 'asc'
      }
    });
    return c.json({ success: true, data: laundryServices });
  } catch (error) {
    console.error('Laundry service error:', error);
    return c.json({ success: false, error: 'Failed to fetch laundry services' }, 500);
  }
});

router.get('/cleaning', async (c) => {
  try {
    const cleaningServices = await prisma.cleaningService.findMany({
      orderBy: {
        price: 'asc'
      }
    });
    return c.json({ success: true, data: cleaningServices });
  } catch (error) {
    console.error('Cleaning service error:', error);
    return c.json({ success: false, error: 'Failed to fetch cleaning services' }, 500);
  }
});

export { router as serviceRoutes };