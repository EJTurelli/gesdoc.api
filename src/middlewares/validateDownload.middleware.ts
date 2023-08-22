import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

const loginSchema = yup.object({
  query: yup.object({
    hash: yup.string().required(),
  })
});

export const validateDownload = async (req: Request, res: Response, next: NextFunction) => {
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

  