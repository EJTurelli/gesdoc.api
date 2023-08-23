import bcrypt from 'bcrypt';

export const getFileHash = (name: string): Promise<string | void> => {

    return new Promise(async (resolve, reject) => {

        try {
            const salt = await bcrypt.genSalt(process.env.FILES_SALT_ROUNDS);
            const hash = await bcrypt.hash(name, salt);
           
            return resolve(hash);
        } catch (error) {
            return reject('Error cripto');
        }
    });
}


