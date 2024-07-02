import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { User } from '../types';

export const generateAccessToken = ({ id, email, name }: User) => {
  return jwt.sign({ id, email, name }, process.env.ACCESS_SECRET ?? 'secret', {
    expiresIn: '15m',
  });
};

export const generateRefreshToken = ({ id, email, name }: User) => {
  return jwt.sign({ id, email, name }, process.env.REFRESH_SECRET ?? 'secret', {
    expiresIn: '1w',
  });
};

export const comparePasswords = async (
  password: string,
  hashedPassword: string,
) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const hashPassword = async (password: string) => {
  const saltRounds = process.env.SALT_ROUNDS || 10;
  return await bcrypt.hash(password, saltRounds);
};
