import { NextFunction, Request, Response } from 'express';
import { NewUserEntry } from '../types';
import { validateNewUserEntry } from '../validators/userValidator';
import bcrypt from 'bcrypt';
import UserModel from '../models/userModel';

export default class AuthController {
  // static async login(req: Request, res: Response, next: NextFunction) {}

  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      // Validate Entries
      const newUser: NewUserEntry = validateNewUserEntry(req.body);

      // Hash Password
      const saltRounds = process.env.SALT_ROUNDS || 10;
      const hashedPassword = await bcrypt.hash(newUser.password, saltRounds);

      // Create the user
      const createdUser = await UserModel.createUser({
        ...newUser,
        password: hashedPassword,
      });

      return res.status(201).json(createdUser);
    } catch (error: any) {
      next(error);
    }
  }
}
