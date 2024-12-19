import { Context } from 'hono';
import type { StatusCode } from 'hono/utils/http-status';
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
      const { 
        order_id, 
        gross_amount, 
        user_id, 
        name, 
        phone, 
        email,
        payment_type,
        amount,
        totalPrice,
        details
      } = await c.req.json();
  
      const parameter = {
        transaction_details: {
          order_id,
          gross_amount,
        },
        customer_details: {
          first_name: name,
          email,
          phone,
        },
        credit_card: {
          secure: true
        }
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
        // Create order record
        const order = await prisma.order.create({
          data: {
            userId: user_id,
            serviceType: payment_type,
            status: 'PENDING',
            amount: amount,
            totalPrice: totalPrice,
            details: details
          }
        });
  
        // Create payment record
        await prisma.payment.create({
          data: {
            userId: user_id,
            amount: totalPrice,
            serviceType: payment_type,
            paymentType: 'MIDTRANS',
            paymentStatus: 'PENDING',
            orderId: order.id
          }
        });
  
        return c.json({ token: data.token });
      }
      return c.json({ 
        success: false, 
        message: (data as any).message || 'Failed to create transaction' 
      }, 400 as StatusCode); // Cast to StatusCode

    } catch (error) {
      console.error('Payment error:', error);
      return c.json({ 
        success: false, 
        message: 'Internal server error'
      }, 500 as StatusCode);
    }
  }
}