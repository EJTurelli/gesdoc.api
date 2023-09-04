import { Request, Response } from 'express';
import { createUser, findAllUsers } from "../services/user.service";
import { IUserData } from '../interfaces/user.interface';
import { isActiveResetPassByHash, setPass } from '../services/pass.service';

export const isHashValid = async (req: Request, res: Response) => {

    try {
        await isActiveResetPassByHash(req.params.hash);

        res.status(200).send();
        return;
    } catch (err) {
        return res.status(500).json({ message: err });
    }

}

export const postPass = async (req: Request, res: Response) => {

    try {
        const { password } = req.body;
        const result = await setPass(req.params.hash, password);

        if (result) {
            return res.status(201).send();
        }
        
        return res.status(500).json({ message: 'Error with Password' });;
    } catch (err: any) {
        return res.status(500).json({ message: err });
    }

}



