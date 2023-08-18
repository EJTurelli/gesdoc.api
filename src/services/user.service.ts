import { RowDataPacket } from "mysql2";
import { pool } from "../db";
import { IUser } from "../interfaces/user.interface";

export const findActiveUserByCuil = (cuil: string): Promise<IUser | void> => {

    const query = `SELECT * FROM users WHERE cuil='${cuil}'`;

    return new Promise((resolve, reject) => {
        try {
            pool.query(query, function(error, rows: RowDataPacket[]) {
        
                if (error) return reject(error);
                if (rows.length <= 0) return reject({'message': 'Not found'});             
                if (!rows[0].status) return reject({'message': 'Not found'});
          
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

    const query = `SELECT hash, status FROM users WHERE cuil='${cuil}'`;

    return new Promise((resolve, reject) => {
        try {
            pool.query(query, function(error, rows: RowDataPacket[]) {
        
                if (error) return reject(error);
                if (rows.length <= 0) return reject({'message': 'Not found'});             
                if (!rows[0].status) return reject({'message': 'Not found'});
          
                const hash: string = rows[0].hash;      
                return resolve(hash);
            });                            
        } catch (error) {
            return reject({'message': 'Error database'});
        }
    });
}
