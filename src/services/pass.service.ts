import { RowDataPacket } from "mysql2";
import { pool } from "../db";
import { IUser } from "../interfaces/user.interface";
import { randomUUID } from "crypto";
import { createPassHash } from "./encript.service";

export const isActiveResetPassByHash = (hash: string): Promise<boolean> => {

    const query = `SELECT * FROM password_reset WHERE hash='${hash}' AND expiration>NOW()`;

    return new Promise((resolve, reject) => {
        try {
            pool.query(query, function(error, rows: RowDataPacket[]) {
        
                if (error) return reject(error.code);      
                if (rows.length <= 0) return reject('Not found');
          
                return resolve(true);
            });                            
        } catch (error) {
            return reject('Error database');
        }
    });
}

export const resetPass = (user: IUser): Promise<string | void> => {

    var hash = randomUUID()+"-"+randomUUID();
        
    const query = `INSERT INTO password_reset (hash, expiration, user_id)
    VALUES ('${hash}', ADDTIME(NOW(), '00:05:00'), '${user.id}');`;

    return new Promise((resolve, reject) => {
        try {
            pool.query(query, function(error, rows: RowDataPacket[]) { 
                if (error) return reject(error.code);      
                return resolve(hash);
            });                            
        } catch (error) {
            return reject('Error database');
        }
    });
}

export const setPass = (hash: string, password: string): Promise<boolean | void> => {
      
    const query = `SELECT user_id FROM password_reset WHERE hash='${hash}' AND expiration>NOW()`;

    return new Promise((resolve, reject) => {
        try {
            pool.query(query, async function (error, rows: RowDataPacket[]) {
                if (error) return reject(error.code);
                if (rows.length <= 0) return reject('Not found');

                const userId = rows[0].user_id;
                const hashPass = await createPassHash(password);

                const query1 = `UPDATE users SET hash='${hashPass}' WHERE id=${userId}`;
                pool.query(query1, async function (error, rows: RowDataPacket[]) {
                    if (error) return reject(error.code);
                    return resolve(true);
                });
            });                            
        } catch (error) {
            return reject('Error database');
        }
    });
}

