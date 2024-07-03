import { Request } from 'express';

declare module 'express' {
  interface Request {
    userId?: number;
  }
}
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  balance: number;
}

export type NewUserEntry = Omit<User, 'id' | 'balance'>;
export type LoginUserEnrty = Omit<User, 'id' | 'balance' | 'name'>;

interface Operation {
  id: Number;
  type: String;
  amount: Number;
  userId: Number;
  categoryId: Number;
  description: String?;
}

export type NewOperationEntry = Omit<Operation, 'id', 'userId'>;
export type NewOperationInsert = Omit<Operation, 'id'>;
