import { Context } from 'hono';
import { UserService } from '../services/user';
import jwt from 'jsonwebtoken';

export class UserController {
  static async getUser(c: Context) {
    try {
      const authHeader = c.req.header('Authorization');
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return c.json({ success: false, message: 'Unauthorized' }, 401);
      }
      const token = authHeader.slice(7);
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      const userId = (decodedToken as jwt.JwtPayload).userId;

      if (!userId) {
        return c.json({ success: false, message: 'User ID is required' }, 400);
      }
      const user = await UserService.findById(userId);
      if (!user) {
        return c.json({ success: false, message: 'User not found' }, 404);
      }
      return c.json({ success: true, data: user });
    } catch (error) {
      const errorMessage = (error as Error).message;
      return c.json({ success: false, message: errorMessage }, 500);
    }
  }
}