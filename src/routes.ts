import express, { Request, Response } from 'express';

import { verifyToken } from "./middlewares/auth.middleware";
import { validateLogin } from "./middlewares/validateLogin.middleware";
import { login } from "./controllers/login.controller";
import { getFile, getFiles, postFile } from './controllers/files.controller';
import { validateDownload } from './middlewares/validateDownload.middleware';
import { validateAdmin } from './middlewares/validateAdmin.middleware';
import { validateUpload } from './middlewares/validateUpload.middleware';

const router = express.Router();

export const routes = (app: any) => {
  router.post("/login", validateLogin, (req: Request, res: Response) => login(req, res));

  router.get("/user", verifyToken, (req: Request, res: Response) => {
    res.status(200).json({'User': req.user.surname});
  });

  router.post("/user", verifyToken, (req: Request, res: Response) => {
    res.status(200).json({'User': req.user.surname});
  });

  router.put("/user", verifyToken, (req: Request, res: Response) => {
    res.status(200).json({'User': req.user.surname});
  });

  router.post("/email", verifyToken, (req: Request, res: Response) => {
    res.status(200).json({'Email': req.user.surname});
  });

  router.get("/documents", verifyToken, (req: Request, res: Response) => getFiles(req, res));

  router.get("/document", [verifyToken, validateDownload], (req: Request, res: Response) => getFile(req, res));

  router.post("/document", [verifyToken, validateAdmin, validateUpload], (req: Request, res: Response) => postFile(req, res));

  app.use(router);
};
