import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { NewUserEntry } from '../types';
import {
  validateLoginEntry,
  validateNewUserEntry,
} from '../validators/userValidator';
import UserModel from '../models/userModel';

export default class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      // Validate Entries
      const userToLogin = validateLoginEntry(req.body);

      // Find the user
      const user = await UserModel.findUserByEmail(userToLogin.email);

      if (user) {
        // Compare the passwords
        const isPasswordMatch = await bcrypt.compare(
          userToLogin.password,
          user.password,
        );

        if (isPasswordMatch) {
          const token = jwt.sign(
            { id: user.id, email: user.email, name: user.name },
            process.env.JWT_SECRET || 'secret',
          );

          return res.status(200).json({ token });
        } else {
          throw new Error('The email or passwrord is incorrect.');
        }
      } else {
        throw new Error('The email or passwrord is incorrect.');
      }
    } catch (error: any) {
      next(error);
    }
  }

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
