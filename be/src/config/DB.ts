import { drizzle } from 'drizzle-orm';
import { pg } from 'pg';

const db = drizzle(pg({
  connectionString: process.env.DATABASE_URL,
}));

export { db };
