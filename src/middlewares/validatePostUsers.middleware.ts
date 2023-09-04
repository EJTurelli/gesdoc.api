import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import { UserRol, UserStatus } from '../interfaces/user.interface';
import { yupValidate } from '../helpers/yupValidate.helper';

const postUsersSchema = yup.object({
  body: yup.object({
    surname:  yup.string().required(),
    name:  yup.string().required(),
    cuil:  yup.string().min(11).max(11).required(),
    email:  yup.string().email().required(),
    status:  yup.string().oneOf([UserStatus.enabled, UserStatus.disabled]).required(),
    rol:  yup.string().oneOf([UserRol.administrator, UserRol.official]).required(),
  })
});

export const validatePostUsers = async (req: Request, res: Response, next: NextFunction) => {
  return yupValidate(req, res, next, postUsersSchema);
};

  