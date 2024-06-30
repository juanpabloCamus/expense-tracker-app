export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  balance: number;
}

export type NewUserEntry = Omit<User, 'id' | 'balance'>;
