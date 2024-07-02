export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  balance: number;
}

export type NewUserEntry = Omit<User, 'id' | 'balance'>;
export type LoginUserEnrty = Omit<User, 'id' | 'balance' | 'name'>;
