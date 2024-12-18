import prisma from '../config/prisma';
import { hashPassword, comparePassword } from '../utils/password';
import jwt from 'jsonwebtoken';

export class AuthService {
  static async register(data: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    kostName: string;
  }) {
    try {
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email: data.email }
      });

      if (existingUser) {
        throw new Error('Email already registered');
      }

      // Check if kost exists
      const kost = await prisma.kost.findUnique({
        where: { name: data.kostName }
      });

      if (!kost) {
        throw new Error('Kost not found');
      }

      // Hash password
      const hashedPassword = await hashPassword(data.password);

      // Create user
      const user = await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: hashedPassword,
          phone: data.phone,
          kostName: data.kostName,
        }
      });

      // Create initial KostStatus
      await prisma.kostStatus.create({
        data: {
          userId: user.id,
          kostId: kost.id,
          monthlyPrice: 2500000, // Default monthly price
          paymentStatus: 'UNPAID',
          continuousType: '1', // Default to 1 month
        }
      });

      return {
        success: true,
        message: 'Registration successful'
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Registration failed');
    }
  }

  static async login(email: string, password: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
        include: {
          kost: true
        }
      });

      if (!user) {
        throw new Error('User not found');
      }

      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
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
          kostLocation: user.kost?.location
        }
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Login failed');
    }
  }
}