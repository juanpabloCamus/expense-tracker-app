import { NewUserEntry } from '../types';
import User from '../schemas/User';
import { ServerError } from '../middlewares/errorHandler';

export default class UserModel {
  /**
   * Insert a new user.
   * @param newUser - The new user entry.
   * @returns A promise that resolves to the created user.
   * @throws Error if there is an error with the insert with query.
   */
  static async createUser(newUser: NewUserEntry): Promise<User> {
    try {
      const createdUser = await User.create(newUser);
      return createdUser;
    } catch (error: any) {
      console.error(error);
      throw new ServerError('Internal Server Error');
    }
  }

  /**
   * Find user by email.
   * @param email - User email.
   * @returns A promise that resolves the found user.
   * @throws Error if there is an error with the query.
   */
  static async findUserByEmail(email: string): Promise<User | null> {
    try {
      const user = await User.findOne({ where: { email } });
      return user;
    } catch (error: any) {
      console.error(error);
      throw new ServerError('Internal Server Error');
    }
  }

  /**
   * Update the user balance.
   * @param userId - User ID.
   * @param newBalance - New balance entry.
   * @returns A promise.
   * @throws Error if there is an error with the query.
   */
  static async updateUserBalance(userId: Number, newBalance: number) {
    const user = await User.findOne({ where: { id: userId } });

    if (user) {
      await user.update({ balance: user.balance + newBalance });
    } else {
      throw new ServerError('User not found');
    }
  }
}
