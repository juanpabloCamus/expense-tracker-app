import { ServerError } from '../middlewares/errorHandler';
import { NewUserEntry } from '../types';

export const validateNewUserEntry = (body: any): NewUserEntry => {
  const { name, email, password } = body;

  //Check if the fields are empty
  if (!name || !email || !password) {
    throw new ServerError('Missing required information', 400);
  }

  //Check if the fields are strings
  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof password !== 'string'
  ) {
    throw new ServerError('Invalid input', 400);
  }

  //Check if the email is valid
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new ServerError('Invalid email', 400);
  }

  //Check if the name have more than 32 characters
  if (name.length > 32) {
    throw new ServerError('Name is too long', 400);
  }

  // TODO: Make password validator for later

  return {
    name,
    email,
    password,
  };
};
