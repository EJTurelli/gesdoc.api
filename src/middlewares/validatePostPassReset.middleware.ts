import { Request, Response, NextFunction } from 'express';
var is = require('type-is');
import * as yup from 'yup';
import { yupValidate } from '../helpers/yupValidate.helper';

const postPassResetSchema = yup.object({
  body: yup.object({
    cuil: yup.string().min(11).max(11).required()
      .matches(/^\d+$/, "Must Contain only numbers"),
  }),
});

export const validatePostPassReset = async (req: Request, res: Response, next: NextFunction) => {
  return yupValidate(req, res, next, postPassResetSchema);
};

  