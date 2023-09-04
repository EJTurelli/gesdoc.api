import { Request, Response } from 'express';
import { createUser, findAllUsers } from "../services/user.service";
import { IUserData } from '../interfaces/user.interface';

export const getUsers = async (req: Request, res: Response) => {

    try {
        const {
            surname,
            name,
            cuil,
            email,
            status,
            rol,
        } = req.query;

        const search: IUserData = {
            surname: surname as string,
            name: name as string,
            cuil: cuil as string,
            email: email as string,
            status: status as string,
            rol: rol as string
        };

        const users = await findAllUsers(search);

        res.status(200).send({'users': users});
        return;
    } catch (err) {
        return res.status(500).json({ message: err });
    }

}

export const postUser = async (req: Request, res: Response) => {

    try {
        const {
            surname,
            name,
            cuil,
            email,
            status,
            rol,
        } = req.body;

        const user: IUserData = {
            surname: surname as string,
            name: name as string,
            cuil: cuil as string,
            email: email as string,
            status: status as string,
            rol: rol as string
        };

        const users = await createUser(user);

        res.status(201).send();
        return;
    } catch (err: any) {
        return res.status(500).json({ message: err });
    }

}



