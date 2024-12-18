import prisma from '../config/prisma';
import { hashPassword } from '../utils/password';

export class UserService {
  static async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        kost: true,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return {
      ...user,
      kostLocation: user.kost?.location || null,
    };
  }

  static async create(data: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    kostName: string;
  }) {
    try {
      const hashedPassword = await hashPassword(data.password);
      return await prisma.user.create({
        data: {
          ...data,
          password: hashedPassword,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to create user: ${error.message}`);
      } else {
        throw new Error('Failed to create user: Unknown error');
      }
    }
  }

  static async findByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }
}