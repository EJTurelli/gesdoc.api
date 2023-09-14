
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { findHashForActiveUserByCuil } from '../services/user.service';

import dotenv from 'dotenv';
import { compareHash } from '../services/encript.service';
dotenv.config();

export const login = async (req: Request, res: Response) => {
    try {
        const { cuil, password } = req.body;
   
        const hash = await findHashForActiveUserByCuil(cuil);
        if (hash) {
          const ok = await compareHash(password, hash); 
          if (ok) {
            const token = jwt.sign({ cuil }, process.env.TOKEN_KEY, { expiresIn: "1h" });
            res.status(200).json({ token });
            return;
          }        
        }
        res.status(403).send({'message': 'Forbidden'});        
        return;
    } catch (err) {
      res.status(404).send({'message': err});
    }
};

