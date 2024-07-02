import { Request, Response, NextFunction } from 'express';

export class ServerError extends Error {
  status: number;

  constructor(message: string, status: number = 500) {
    super(message);
    this.status = status;
  }
}

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  console.log('=== ERROR HANDLER ===');
  console.error(err);

  if (err instanceof ServerError) {
    return res.status(err.status).send(err.message);
  }

  res.status(500).send('Internal server error');
}
