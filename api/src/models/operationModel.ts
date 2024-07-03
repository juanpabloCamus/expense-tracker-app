import Operation from '../schemas/Operation';
import { NewOperationInsert } from '../types';

export default class OperationModel {
  // TODO: Add pagination
  /**
   * Get all operations from a user.
   * @param userId - User id.
   * @returns A promise that resolves to the operations.
   * @throws Error if there is an error with the query.
   */
  static async getUserOperations(userId: Number): Promise<Operation[]> {
    const userOperations = await Operation.findAll({
      where: {
        user_id: userId,
      },
    });

    return userOperations;
  }

  /**
   * Get one operation from a user.
   * @param operationId - Operation ID.
   * @param userId - User ID.
   * @returns A promise that resolves to the operation.
   * @throws Error if there is an error with the query.
   */
  static async getOperationById(operationId: Number, userId: Number) {
    const operation = await Operation.findOne({
      where: {
        id: operationId,
        user_id: userId,
      },
    });

    return operation;
  }

  /**
   * Create one operation.
   * @param operationId - Operation ID.
   * @param userId - User ID.
   * @returns A promise that resolves to the operation.
   * @throws Error if there is an error with the query.
   */
  static async createOperation(
    operation: NewOperationInsert,
  ): Promise<Operation> {
    const newOperation = await Operation.create({
      ...operation,
      user_id: operation.userId,
      category_id: operation.categoryId,
    });

    return newOperation;
  }
}
