import { Context } from 'hono';
import { AuthService } from '../services/auth';

export class AuthController {
  static async register(c: Context) {
    try {
      const data = await c.req.json();
      if (!data.name || !data.email || !data.password || !data.kostName) {
        return c.json({ 
          success: false, 
          message: 'Missing required fields' 
        }, 400);
      }

      const result = await AuthService.register(data);
      return c.json(result);
    } catch (error) {
      const errorMessage = (error as Error).message;
      return c.json({ 
        success: false, 
        message: errorMessage 
      }, 400);
    }
  }

  static async login(c: Context) {
    try {
      const { email, password } = await c.req.json();
      const result = await AuthService.login(email, password);
      return c.json(result);
    } catch (error) {
      const errorMessage = (error as Error).message;
      return c.json({ success: false, message: errorMessage }, 401);
    }
  }
}