import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { userRoutes } from './routes/user.js';
import { authRoutes } from './routes/auth.js';
import { kostRoutes } from './routes/kost.js';
import { orderRoutes } from './routes/order.js';
import { paymentRoutes } from './routes/payment.js';
import { serviceRoutes } from './routes/service.js';
import prisma from './config/prisma.js';

const app = new Hono();

// Move CORS configuration before route definitions
app.use('/*', cors({
  origin: (origin) => {
    // Allow requests from both localhost and deployed frontend
    const allowedOrigins = [
      'https://roomah.vercel.app',
      'http://localhost:5173'
    ];
    return allowedOrigins.includes(origin) ? origin : false;
  },
  credentials: true,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
  maxAge: 86400,
}));

// Add OPTIONS handler for preflight requests
app.options('/*', (c) => {
  return c.text('', 204);
});

app.use('*', logger());

app.route('/api/users', userRoutes);
app.route('/api/auth', authRoutes);
app.route('/api/kosts', kostRoutes);
app.route('/api/payment', paymentRoutes);
app.route('/api/services', serviceRoutes);
app.route('/api/orders', orderRoutes);

app.get('/', async (c) => {
  try {
    await prisma.$connect();
    console.log('Successfully connected to database');
    return c.json({
      status: 'healthy',
      database: 'connected',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Database connection failed:', error);
    const errorMessage = (error instanceof Error) ? error.message : 'Unknown error';
    return c.json({
      status: 'error',
      message: errorMessage,
      timestamp: new Date().toISOString(),
    }, 500);
  }
});

const port = process.env.PORT || 3000;

console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port: Number(port),
});