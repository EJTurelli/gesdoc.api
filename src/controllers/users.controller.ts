import { Request, Response } from 'express';
import { findAllActiveUsers } from "../services/user.service";

export const getUsers = async (req: Request, res: Response) => {

    try {
        const users = await findAllActiveUsers();

        res.status(200).send({'users': users});
        return;
    } catch (err) {
        return res.status(500).json({ message: err });
    }

}

