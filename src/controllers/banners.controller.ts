import fs from "fs";
import { Request, Response } from 'express';

export const getBanner = async (req: Request, res: Response) => {

    const { id } = req.params;

    const directoryPath = process.env.BASE_PATH + `/static/banners/${id}`;

    fs.readdir(directoryPath!, async function (err, files) {
        if (err) {
            res.status(403).send({'message': 'Unable to scan banner!'});        
            return;
        }

        for await (const file of files) {          
            const date = new Date();
            const dateFrom = new Date(parseInt(file.substring(0, 4)), parseInt(file.substring(4, 6))-1, parseInt(file.substring(6, 8)));
            const dateTo = new Date(parseInt(file.substring(9, 13)), parseInt(file.substring(13, 15))-1, parseInt(file.substring(15, 17)), 23, 59, 59, 999);

            if (dateFrom <= date && date <= dateTo) {
                res.download(directoryPath + '/' + file, file, (err) => {
                    if (err) {
                      res.status(500).send({message: "Could not download the banner. " + err});
                    }
                  });
                return;
            }

        };
        
        const defaultBanner = 'default.png';
        res.download(directoryPath + '/' + defaultBanner, defaultBanner, (err) => {
            if (err) {
              res.status(500).send({message: "Could not download the banner. " + err});
            }
          });
        return;
    });
}

