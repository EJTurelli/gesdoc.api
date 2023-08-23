import { Request, Response } from 'express';
import { findAllUsers } from "../services/user.service";
import { IUserSearch } from '../interfaces/user.interface';

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

        const search: IUserSearch = {
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

