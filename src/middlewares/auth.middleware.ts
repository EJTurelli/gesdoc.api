import * as jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express';
import { findActiveUserByCuil } from '../services/user.service';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["x-access-token"] as string;

  if (!token) {
    return res.status(401).send({'message': 'Unauthorized'});
  }
  try {
    const { cuil } = jwt.verify(token, process.env.TOKEN_KEY) as { cuil: string, iat: number, exp: number };
    
    findActiveUserByCuil(cuil)
      .then(user => {
        req.user = user;
        return next();
      })
      .catch((err) => {
        const msg = err.message;
        return res.status(404).send({'message': msg});
      });
 
  } catch (err) {
    return res.status(401).send({'message': 'Unauthorized'});
  }
};
