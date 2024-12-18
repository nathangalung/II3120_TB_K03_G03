import { Context } from 'hono';
import midtransClient from 'midtrans-client';
import { Buffer } from 'buffer';
import prisma from '../config/prisma';

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: 'SB-Mid-server-Hj0xm3VgzEqepViWXD41Z0lu',
  clientKey: 'SB-Mid-client-ZVBki7Zn0X18Mooe',
});

export class PaymentController {
  static async createTransaction(c: Context) {
    try {
      const { order_id, gross_amount, user_id, name, phone, email } = await c.req.json();

      const parameter = {
        transaction_details: {
          order_id,
          gross_amount,
        },
        customer_details: {
          user_id,
          name,
          phone,
          email,
        },
        credit_card: {
          secure: true,
        },
      };

      const authString = Buffer.from(`SB-Mid-server-Hj0xm3VgzEqepViWXD41Z0lu:`).toString('base64');
      const response = await fetch('https://app.sandbox.midtrans.com/snap/v1/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${authString}`,
        },
        body: JSON.stringify(parameter),
      });

      const data = await response.json();
      if (response.ok) {
        // Create order in the database
        await prisma.order.create({
          data: {
            id: order_id,
            userId: user_id,
            serviceType: 'KOST', // Example service type
            status: 'PENDING',
            amount: gross_amount,
          },
        });

        return c.json({ token: data.token });
      } else {
        return c.json({ success: false, message: data.message }, response.status);
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      return c.json({ success: false, message: errorMessage }, 500);
    }
  }
}