import { ServerError } from '../middlewares/errorHandler';
import { LoginUserEnrty, NewUserEntry } from '../types';

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return !emailRegex.test(email);
};

// TODO: Make password validator for later

export const validateNewUserEntry = (body: any): NewUserEntry => {
  const { name, email, password } = body;

  //Check if the fields are empty
  if (!name || !email || !password) {
    throw new ServerError('Missing required information', 400);
  }

  // TODO: check
  //Check if the fields are strings
  // if (
  //   typeof name !== 'string' ||
  //   typeof email !== 'string' ||
  //   typeof password !== 'string'
  // ) {
  //   throw new ServerError('Invalid input', 400);
  // }

  //Check if the email is valid
  if (validateEmail(email)) {
    throw new ServerError('Invalid email', 400);
  }

  //Check if the name have more than 32 characters
  if (name.length > 32) {
    throw new ServerError('Name is too long', 400);
  }

  return {
    name,
    email,
    password,
  };
};

export const validateLoginEntry = (body: any): LoginUserEnrty => {
  const { email, password } = body;

  //Check if the email is valid
  if (validateEmail(email)) {
    throw new ServerError('Invalid email', 400);
  }

  return { email, password };
};
