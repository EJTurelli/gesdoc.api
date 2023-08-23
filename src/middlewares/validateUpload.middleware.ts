import { Request, Response, NextFunction } from 'express';
var is = require('type-is');
import * as yup from 'yup';

const uploadSchema = yup.object({
  params: yup.object({
    cuil: yup.string().min(11).max(11).required()
  }),
});

export const validateUpload = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!is(req, ['multipart'])) {
      return res.status(403).send({message: 'Please provide a file'});
    }

    await uploadSchema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return next();
  } catch (err: any) {
      return res.status(500).json({ message: err.message });
  }
};

  