import { ServerError } from '../middlewares/errorHandler';
import { NewOperationEntry } from '../types';

export const validateNewOperationEntry = (body: any): NewOperationEntry => {
  const { type, amount, description, categoryId } = body;
  console.log(body);
  if (!type || !amount || !categoryId) {
    throw new ServerError('Missing fields', 400);
  }

  if (typeof amount !== 'number') {
    throw new ServerError('Invalid Amount', 400);
  }

  if (typeof categoryId !== 'number') {
    throw new ServerError('Invalid Category', 400);
  }

  if (type != 'income' && type != 'withdrawal') {
    throw new ServerError('Invalid operation type', 400);
  }

  if (description.length > 256) {
    throw new ServerError('Description is too large', 400);
  }

  return { type, amount, description, categoryId };
};
