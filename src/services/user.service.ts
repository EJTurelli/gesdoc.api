import { RowDataPacket } from "mysql2";
import { pool } from "../db";
import { IUser, IUserSearch, UserStatus } from "../interfaces/user.interface";

export const findActiveUserByCuil = (cuil: string): Promise<IUser | void> => {

    const query = `SELECT * FROM users WHERE cuil='${cuil}' AND status='${UserStatus.enabled}'`;

    return new Promise((resolve, reject) => {
        try {
            pool.query(query, function(error, rows: RowDataPacket[]) {
        
                if (error) return reject(error);
                if (rows.length <= 0) return reject('Not found');             
          
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
            return reject('Error database');
        }
    });
}

export const findHashForActiveUserByCuil = (cuil: string): Promise<string | void> => {

    const query = `SELECT hash, status FROM users WHERE cuil='${cuil}' AND status='${UserStatus.enabled}'`;

    return new Promise((resolve, reject) => {
        try {
            pool.query(query, function(error, rows: RowDataPacket[]) {
        
                if (error) return reject(error);
                if (rows.length <= 0) return reject('Not found');
          
                const hash: string = rows[0].hash;      
                return resolve(hash);
            });                            
        } catch (error) {
            return reject('Error database');
        }
    });
}

export const findAllUsers = (search: IUserSearch): Promise<IUser[] | []> => {

    var where = '';
    if (search.surname) where += `${where.length?' AND':''} surname LIKE '%${search.surname}%'`;
    if (search.name) where += `${where.length?' AND':''} name LIKE '%${search.name}%'`;
    if (search.cuil) where += `${where.length?' AND':''} cuil LIKE '%${search.cuil}%'`;
    if (search.email) where += `${where.length?' AND':''} email LIKE '%${search.email}%'`;
    if (search.status) where += `${where.length?' AND':''} status = '${search.status}'`;
    if (search.rol) where += `${where.length?' AND':''} rol = '${search.rol}'`;

    const query = `SELECT * FROM users ${where.length?('WHERE'+where):''} ORDER BY surname, name`;

    return new Promise((resolve, reject) => {
        var users: IUser[] = [];
        try {
            pool.query(query, function(error, rows: RowDataPacket[]) {
        
                if (error) return reject(error);
                if (rows.length <= 0) return reject('Not found');             

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
            return reject('Error database');
        }
    });
}