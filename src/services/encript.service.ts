import bcrypt from 'bcrypt';

const _createHash = (data: string, saltRonuds: number): Promise<string | void> => {

    return new Promise(async (resolve, reject) => {

        try {
            const salt = await bcrypt.genSalt(saltRonuds);
            const hash = await bcrypt.hash(data, salt);
           
            return resolve(hash);
        } catch (error) {
            return reject('Error cripto');
        }
    });
}

export const createHash = (data: string): Promise<string | void> => {
    return _createHash(data, parseInt(process.env.SALT_ROUNDS));
}

export const createPassHash = (data: string): Promise<string | void> => {
    return _createHash(data, parseInt(process.env.PASS_SALT_ROUNDS));
}

export const compareHash = (data: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(data, hash);
}


