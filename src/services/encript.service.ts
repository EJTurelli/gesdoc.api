import bcrypt from 'bcrypt';

export const getFileHash = (name: string): Promise<string | void> => {

    return new Promise(async (resolve, reject) => {

        try {
            const salt = await bcrypt.genSalt(3);
            const hash = await bcrypt.hash(name, salt);
           
            return resolve(hash);
        } catch (error) {
            return reject({'message': 'Error cripto'});
        }
    });
}


