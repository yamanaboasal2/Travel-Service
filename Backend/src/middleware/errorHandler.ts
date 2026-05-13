import { Request, Response, NextFunction } from 'express';

class AppError extends Error {
  constructor(public message: string, public statusCode: number) {
    super(message);
  }
}

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message
    });
  }

  if (err instanceof SyntaxError) {
    return res.status(400).json({
      error: 'Invalid JSON'
    });
  }

  console.error(err);
  return res.status(500).json({
    error: 'Internal Server Error'
  });
};

export default AppError;
