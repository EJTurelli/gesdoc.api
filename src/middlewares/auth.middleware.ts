import * as jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express';


const dotenv = require('dotenv');
dotenv.config()

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["x-access-token"] as string;

  if (!token) {
    return res.status(403).send("Invalid Token");
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY) as { userId: number, cuil: string, iat: number, exp: number };

    req.user = {cuil: decoded.cuil, id: decoded.userId};

    // levanto el dato de la base de datos y agrego a la req el user

  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};
