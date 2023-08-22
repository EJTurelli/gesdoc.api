import { Request, Response, NextFunction } from 'express';

export const validateAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.user.rol === 'administrador') {
      return next();
    }

    return res.status(401).send({'message': 'Unauthorized'});
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

  