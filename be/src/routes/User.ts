import { Hono } from 'hono';
import { User } from '../models/User';

const app = new Hono();

// Example of a route that interacts with Drizzle ORM
app.get('/users', async (ctx) => {
  const users = await User.find();
  return ctx.json(users);
});

app.post('/users', async (ctx) => {
  const data = await ctx.req.json();
  const user = await User.create({
    email: data.email,
    password: data.password,
  });
  return ctx.json(user);
});

export default app;
