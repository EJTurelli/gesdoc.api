import { Request, Response } from 'express';
import { isActiveResetPassByHash, resetPass, setPass } from '../services/pass.service';
import { findActiveUserByCuil } from '../services/user.service';
import { IUser } from '../interfaces/user.interface';
import { MailType, sendMail } from '../services/mail.service';

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

export const resetPassword = async (req: Request, res: Response) => {

    try {
        const user: IUser = await findActiveUserByCuil(req.body.cuil as string).catch ((err) => {
            return res.status(500).json({ message: err });
        }) as IUser;

        if (!user) {
            return res.status(500).json({ message: 'Error with User' });;
        }

        const url = await resetPass(user);
        if (!url) {
            return res.status(500).json({ message: 'Error with Password' });;
        }
        
        sendMail(MailType.resetKey, user, url);       
        return res.status(200).json();
    } catch (err: any) {
        return res.status(500).json({ message: err });
    }

}


