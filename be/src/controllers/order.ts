import { Context } from 'hono';
import prisma from '../config/prisma';

export class OrderController {
  static async createOrder(c: Context) {
    try {
      const { userId, serviceType, items } = await c.req.json();
      
      const order = await prisma.order.create({
        data: {
          userId,
          serviceType,
          status: 'PENDING',
          amount: items.reduce((total: number, item: any) => total + (item.price * item.quantity), 0)
        }
      });

      // Create service-specific history based on serviceType
      switch (serviceType) {
        case 'water':
          await prisma.waterDeliveryHistory.create({
            data: {
              orderId: order.id,
              waterDeliveryId: items[0].id,
              userId,
              quantity: items[0].quantity,
              totalPrice: items[0].price * items[0].quantity,
            }
          });
          break;
          
        case 'laundry':
          await prisma.laundryDeliveryHistory.create({
            data: {
              orderId: order.id,
              laundryDeliveryId: items[0].id,
              userId,
              clothWeight: items[0].clothWeight,
              totalPrice: items[0].totalPrice,
            }
          });
          break;
          
        case 'cleaning':
          await prisma.cleaningServiceHistory.create({
            data: {
              orderId: order.id,
              cleaningServiceId: items[0].id,
              userId,
              duration: items[0].duration,
              totalPrice: items[0].price,
            }
          });
          break;
      }

      return c.json({ success: true, order });
    } catch (error) {
      return c.json({ error: 'Failed to create order' }, 500);
    }
  }

  static async getOrders(c: Context) {
    try {
      const userId = c.req.param('userId');
      const orders = await prisma.order.findMany({
        where: { userId },
        include: {
          waterDeliveryHistories: true,
          laundryDeliveryHistories: true,
          cleaningServiceHistories: true,
        },
        orderBy: { createdAt: 'desc' }
      });
      return c.json(orders);
    } catch (error) {
      return c.json({ error: 'Failed to fetch orders' }, 500);
    }
  }
}