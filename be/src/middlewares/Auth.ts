import { Hono } from 'hono';

export const authMiddleware = (ctx: Hono.Context, next: () => Promise<void>) => {
  const authHeader = ctx.req.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return ctx.json({ error: 'Unauthorized' }, 401);
  }
  const token = authHeader.slice(7);
  // Verify JWT token logic with Supabase or another provider here
  return next();
};