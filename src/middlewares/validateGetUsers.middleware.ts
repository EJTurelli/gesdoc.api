import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import { UserRol, UserStatus } from '../interfaces/user.interface';
import { yupValidate } from '../helpers/yupValidate.helper';

const getUsersSchema = yup.object({
  query: yup.object({
    surname:  yup.string(),
    name:  yup.string(),
    cuil: yup.string().max(11),
    email:  yup.string(),
    status:  yup.string().oneOf([UserStatus.enabled, UserStatus.disabled]),
    rol:  yup.string().oneOf([UserRol.administrator, UserRol.official]),
  })
});

export const validateGetUsers = async (req: Request, res: Response, next: NextFunction) => {
  return yupValidate(req, res, next, getUsersSchema);
};

  