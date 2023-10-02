
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { findActiveUserByCuil, findHashForActiveUserByCuil } from '../services/user.service';

import dotenv from 'dotenv';
import { compareHash } from '../services/encript.service';
import { IUser } from '../interfaces/user.interface';
dotenv.config();

export const login = async (req: Request, res: Response) => {
    try {
        const { cuil, password } = req.body;
   
        const hash = await findHashForActiveUserByCuil(cuil);
        if (hash) {
          const ok = await compareHash(password, hash); 
          if (ok) {
            const user: IUser = await findActiveUserByCuil(req.body.cuil as string).catch ((err) => {
              return res.status(500).json({ message: err });
            }) as IUser;

            const token = jwt.sign({ cuil }, process.env.TOKEN_KEY, { expiresIn: "1h" });
            const { id, ...rest } = user;
            res.status(200).json({ ...rest, token });
            return;
          }        
        }
        res.status(403).send({'message': 'Forbidden'});        
        return;
    } catch (err) {
      res.status(404).send({'message': err});
    }
};

