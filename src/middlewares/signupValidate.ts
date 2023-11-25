import { NextFunction, Request, Response } from 'express';
import SignUpValidation from '../utils/joi';
import { BadRequestError } from '../errors';

export default async function signupValidate(req: Request, res: Response, next: NextFunction) {
  try {
    const { body } = req;
    await SignUpValidation(body);
    next();
  } catch (error) {
    if (error instanceof BadRequestError) {
      next(error);
    } else {
      next(new BadRequestError(error.message));
    }
  }
}
