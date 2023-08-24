import { Request, Response, NextFunction } from 'express';
var is = require('type-is');
import * as yup from 'yup';
import { yupValidate } from '../helpers/yupValidate.helper';

const uploadSchema = yup.object({
  params: yup.object({
    cuil: yup.string().min(11).max(11).required()
  }),
});

export const validateUpload = async (req: Request, res: Response, next: NextFunction) => {
  return yupValidate(req, res, next, uploadSchema);
};

  