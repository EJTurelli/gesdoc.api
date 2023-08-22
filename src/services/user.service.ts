import { RowDataPacket } from "mysql2";
import { pool } from "../db";
import { IUser } from "../interfaces/user.interface";

export const findActiveUserByCuil = (cuil: string): Promise<IUser | void> => {

    const query = `SELECT * FROM users WHERE cuil='${cuil}' AND status='habilitado'`;

    return new Promise((resolve, reject) => {
        try {
            pool.query(query, function(error, rows: RowDataPacket[]) {
        
                if (error) return reject(error);
                if (rows.length <= 0) return reject({'message': 'Not found'});             
          
                const user: IUser = {
                  cuil: rows[0].cuil, 
                  id: rows[0].id,
                  surname: rows[0].surname,
                  name: rows[0].name,
                  status: rows[0].status,
                  rol: rows[0].rol,
                  email: rows[0].email
                };
        
                return resolve(user);
            });                            
        } catch (error) {
            return reject({'message': 'Error database'});
        }
    });
}

export const findHashForActiveUserByCuil = (cuil: string): Promise<string | void> => {

    const query = `SELECT hash, status FROM users WHERE cuil='${cuil}' AND status='habilitado'`;

    return new Promise((resolve, reject) => {
        try {
            pool.query(query, function(error, rows: RowDataPacket[]) {
        
                if (error) return reject(error);
                if (rows.length <= 0) return reject({'message': 'Not found'});             
          
                const hash: string = rows[0].hash;      
                return resolve(hash);
            });                            
        } catch (error) {
            return reject({'message': 'Error database'});
        }
    });
}

export const findAllActiveUsers = (): Promise<IUser[] | []> => {

    const query = `SELECT * FROM users WHERE status='habilitado' order by surname, name`;

    return new Promise((resolve, reject) => {
        var users: IUser[] = [];
        try {
            pool.query(query, function(error, rows: RowDataPacket[]) {
        
                if (error) return reject(error);
                if (rows.length <= 0) return reject({'message': 'Not found'});             

                for (let i = 0; i < rows.length; i++) {
                    const user: IUser = {
                        cuil: rows[i].cuil, 
                        id: rows[i].id,
                        surname: rows[i].surname,
                        name: rows[i].name,
                        status: rows[i].status,
                        rol: rows[i].rol,
                        email: rows[i].email
                    };

                    if (user) users.push(user);
                }
                       
                return resolve(users);
            });                            
        } catch (error) {
            return reject({'message': 'Error database'});
        }
    });
}