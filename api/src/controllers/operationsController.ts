import { NextFunction, Request, Response } from 'express';
import OperationModel from '../models/operationModel';
import { validateNewOperationEntry } from '../validators/operationValidator';
import UserModel from '../models/userModel';

export default class OperationsController {
  static async getUserOperations(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userOperations = await OperationModel.getUserOperations(
        req.userId!,
      );
      return res.status(200).send(userOperations);
    } catch (error: any) {
      next(error);
    }
  }

  static async getUserOperationById(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const operation = OperationModel.getOperationById(
        +req.params.id,
        req.userId!,
      );

      return res.status(200).send(operation);
    } catch (error) {
      next(error);
    }
  }
  static async createOperation(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const validatedOperation = validateNewOperationEntry(req.body);

      const newOperation = await OperationModel.createOperation({
        ...validatedOperation,
        userId: req.userId!,
      });

      await UserModel.updateUserBalance(req.userId!, newOperation.amount);

      return res.status(200).send(newOperation);
    } catch (error) {
      next(error);
    }
  }
  //TODO: Check if the operation is from the user that are requesting
  static async updateOperation(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const validatedOperation = validateNewOperationEntry(req.body);

      const updatedOperation = await OperationModel.updateOperation(
        validatedOperation,
        +req.params.id,
      );

      await UserModel.updateUserBalance(req.userId!, updatedOperation.amount);

      return res.status(200).send(updatedOperation);
    } catch (error) {
      next(error);
    }
  }

  //   static async deleteOperation(req: Request, res: Response) {}
}
