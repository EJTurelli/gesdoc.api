import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import { yupValidate } from '../helpers/yupValidate.helper';

const loginSchema = yup.object({
  body: yup.object({
    cuil: yup.string().min(11).max(11).required(),
    password: yup.string().min(6).max(32).required(),
  })
});

export const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
  return yupValidate(req, res, next, loginSchema);
};

  