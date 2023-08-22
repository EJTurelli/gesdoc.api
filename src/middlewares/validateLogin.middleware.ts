import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

const loginSchema = yup.object({
  body: yup.object({
    cuil: yup.string().min(11).max(11).required(),
    password: yup.string().min(6).max(32).required(),
  })
});

export const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await loginSchema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return next();
  } catch (err: any) {
      return res.status(500).json({ message: err.message });
  }
};

  