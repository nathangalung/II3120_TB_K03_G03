import { drizzle } from 'drizzle-orm';
import { pg } from 'pg';

const db = drizzle(pg);

export const User = db.model('users', {
  id: 'int',
  email: 'string',
  password: 'string',
});
