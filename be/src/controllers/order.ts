import { Context } from 'hono';
import prisma from '../config/prisma';

export class OrderController {
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
        orderBy: { 
          createdAt: 'desc' 
        }
      });

      return c.json({
        success: true,
        data: orders
      });
    } catch (error) {
      console.error('Error fetching orders:', error);
      return c.json({
        success: false,
        error: 'Failed to fetch orders',
        data: []
      }, 500);
    }
  }

  static async createOrder(c: Context) {
    try {
      const { userId, serviceType, items, status, amount, totalPrice, details } = await c.req.json();
      
      const order = await prisma.order.create({
        data: {
          userId,
          serviceType,
          status,
          amount,
          totalPrice,
          details
        }
      });

      return c.json({ 
        success: true, 
        data: order 
      });
    } catch (error) {
      console.error('Error creating order:', error);
      return c.json({ 
        success: false, 
        error: 'Failed to create order' 
      }, 500);
    }
  }
}