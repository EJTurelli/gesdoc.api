import fs from "fs";
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { getFileHash } from "../services/encript.service";
import { upload } from "../services/files.service";

export const getFiles = async (req: Request, res: Response) => {

    const directoryPath = process.env.BASE_PATH + `/static/files/${req.user.cuil}`;

    fs.readdir(directoryPath!, async function (err, files) {
        if (err) {
            res.status(403).send({'message': 'Unable to scan files!'});        
            return;
        }

        const fileInfos: { name: string, fileHash: string }[] = [];

        for await (const file of files) {
            var fileHash = await getFileHash(file);

            if (fileHash) {
                fileInfos.push({
                    name: file,
                    fileHash: fileHash
                });        
            }
        };

        res.status(200).send(fileInfos);

    });
}

export const getFile = async (req: Request, res: Response) => {

    const directoryPath = process.env.BASE_PATH + `/static/files/${req.user.cuil}`;

    fs.readdir(directoryPath!, async function (err, files) {
        if (err) {
            res.status(403).send({'message': 'Unable to scan files!'});        
            return;
        }

        for await (const file of files) {
            const ok = await bcrypt.compare(file, req.query.hash as string); 
            if (ok) {

                res.download(directoryPath + '/'+ file, file, (err) => {
                    if (err) {
                      res.status(500).send({message: "Could not download the file. " + err});
                    }
                  });
                return;
            }
        };
        res.status(403).send({'message': 'Unable to scan files!'});        
    });
}

export const postFile = async (req: Request, res: Response) => {
    try {
        upload(req, res, async (err) => {
            try {
                if (err) {
                    res.status(422).send({'message': `Unable to upload file for cuil ${req.query.cuil}!`});
                    return;
                }

                res.status(200).send();
                return;
            } catch (err) {
                res.status(403).send({ message: err });
                return;
            }
        });
    } catch (error) {
        res.status(403).send({'message': 'Unable to upload file!'});        
        return;
    }

}
