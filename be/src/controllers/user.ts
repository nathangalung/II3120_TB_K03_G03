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

  static async updateUser(c: Context) {
    try {
      const userId = c.req.param('id');
      const updates = await c.req.json();
      
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: updates,
      });

      return c.json({ 
        success: true, 
        data: updatedUser 
      });
    } catch (error) {
      console.error('Error updating user:', error);
      return c.json({ 
        success: false, 
        error: 'Failed to update user' 
      }, 500);
    }
  }
}