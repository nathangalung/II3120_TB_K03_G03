import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { userRoutes } from './routes/user';
import { authRoutes } from './routes/auth';
import prisma from './config/prisma';

const app = new Hono();

app.use('*', logger());
app.use('*', cors());

app.route('/api/users', userRoutes);
app.route('/api/auth', authRoutes);

app.get('/', async (c) => {
  try {
    await prisma.$connect()
    console.log('Successfully connected to database')
    return c.json({ 
      status: 'healthy',
      database: 'connected',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Database connection failed:', error)
    const errorMessage = (error instanceof Error) ? error.message : 'Unknown error';
    return c.json({ 
      status: 'error',
      message: errorMessage,
      timestamp: new Date().toISOString()
    }, 500)
  }
})

const port = process.env.PORT || 3000

console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port: Number(port)
})