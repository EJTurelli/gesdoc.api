import { Request, Response, NextFunction } from 'express';

export const yupValidate = async (req: Request, res: Response, next: NextFunction, schemaToValidate: any) => {
    try {
      await schemaToValidate.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
};