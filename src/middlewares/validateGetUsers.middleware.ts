import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import { UserRol, UserStatus } from '../interfaces/user.interface';

const getUsersSchema = yup.object({
  query: yup.object({
    surname:  yup.string(),
    name:  yup.string(),
    cuil:  yup.string().max(11),
    email:  yup.string(),
    status:  yup.string().oneOf([UserStatus.enabled, UserStatus.disabled]),
    rol:  yup.string().oneOf([UserRol.administrator, UserRol.official]),
  })
});

export const validateGetUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getUsersSchema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return next();
  } catch (err: any) {
      return res.status(500).json({ message: err.message });
  }
};

  