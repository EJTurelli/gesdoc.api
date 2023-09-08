import { Request, Response, NextFunction } from 'express';
var is = require('type-is');
import * as yup from 'yup';
import { yupValidate } from '../helpers/yupValidate.helper';

const postPassSchema = yup.object({
  params: yup.object({
    hash: yup.string().min(73).max(73).required()
  }),
  body: yup.object({
    passwordConfirmation: yup.string().required()
          .oneOf([yup.ref('password')], 'Passwords must match'),
    password: yup.string().required()
          .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
          ),
  }),
});

export const validatePostPass = async (req: Request, res: Response, next: NextFunction) => {
  return yupValidate(req, res, next, postPassSchema);
};

  