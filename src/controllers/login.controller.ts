
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { findHashForActiveUserByCuil } from '../services/user.service';

import dotenv from 'dotenv';
dotenv.config();

export const login = async (req: Request, res: Response) => {
    try {
        const { cuil, password } = req.body;
   
        // const salt = await bcrypt.genSalt(10);
        // const hash = await bcrypt.hash(password, salt);
        // console.log(hash);

        const hash = await findHashForActiveUserByCuil(cuil);
        if (hash) {
          const ok = await bcrypt.compare(password, hash); 
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

