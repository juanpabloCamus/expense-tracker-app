import { NewUserEntry } from '../types';
import User from '../schemas/User';
import { ServerError } from '../middlewares/errorHandler';

export default class UserModel {
  /**
   * Insert a new user.
   * @param newUser - The new user entry.
   * @returns A promise that resolves to the created user.
   * @throws Error if there is an error with the insert with the message 'Internal Server Error'.
   */
  static async createUser(newUser: NewUserEntry): Promise<User> {
    // 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';

    try {
      const createdUser = await User.create(newUser);
      return createdUser;
    } catch (error: any) {
      console.error(error);
      throw new ServerError('Internal Server Error');
    }
  }

  static async findUserByEmail(email: string): Promise<User | null> {
    try {
      const user = await User.findOne({ where: { email } });
      return user;
    } catch (error: any) {
      console.error(error);
      throw new ServerError('Internal Server Error');
    }
  }
}
