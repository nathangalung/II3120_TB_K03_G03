import prisma from '../config/prisma';
import { hashPassword, comparePassword } from '../utils/password';
import jwt from 'jsonwebtoken';

export class AuthService {
  static async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { kost: true }, // Include related Kost data
    });

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid email or password');
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' }
    );

    return {
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        kostName: user.kostName,
        kostLocation: user.kost?.location || null,
      },
    };
  }
}