import { Context } from 'hono';

export const authMiddleware = async (ctx: Context, next: () => Promise<void>) => {
  const authHeader = ctx.req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return ctx.json({ error: 'Unauthorized' }, 401);
  }
  const token = authHeader.slice(7);
  // Verify JWT token logic with Supabase or another provider here
  await next();
};