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

            // Valido el formato del nombre del banner
            // debe ser AAAAMMDD-AAAAMMDD.extensión
            // donde extensión puede ser: png o jpg o gif o webp o svg
            const regexp = new RegExp(/^\d{8}-\d{8}.(png|jpg|gif|webp|svg)$/);
            if (regexp.test(file)) {
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

