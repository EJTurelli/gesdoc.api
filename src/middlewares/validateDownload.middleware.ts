import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import { yupValidate } from '../helpers/yupValidate.helper';

const downloadSchema = yup.object({
  query: yup.object({
    hash: yup.string().required(),
  })
});

export const validateDownload = async (req: Request, res: Response, next: NextFunction) => {
  return yupValidate(req, res, next, downloadSchema);
};

  