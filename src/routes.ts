import express, { Request, Response } from 'express';

import { verifyToken } from "./middlewares/auth.middleware";
import { validateLogin } from "./middlewares/validateLogin.middleware";
import { login } from "./controllers/login.controller";
import { getFile, getFiles, postFile } from './controllers/files.controller';
import { validateDownload } from './middlewares/validateDownload.middleware';
import { validateAdmin } from './middlewares/validateAdmin.middleware';
import { validateUpload } from './middlewares/validateUpload.middleware';
import { getUsers, postUser, putUser } from './controllers/users.controller';
import { validateGetUsers } from './middlewares/validateGetUsers.middleware';
import { isHashValid, postPass, resetPassword } from './controllers/pass.controller';
import { validatePostUsers } from './middlewares/validatePostUsers.middleware';
import { validatePostPass } from './middlewares/validatePostPass.middleware';
import { validatePostPassReset } from './middlewares/validatePostPassReset.middleware';
import { validatePutUsers } from './middlewares/validatePutUsers.middleware';

const router = express.Router();

export const routes = (app: any) => {
  router.post("/login", validateLogin, (req: Request, res: Response) => login(req, res));

  router.get("/user", [verifyToken, validateAdmin, validateGetUsers], (req: Request, res: Response) => getUsers(req, res));

  router.post("/user", [verifyToken, validateAdmin, validatePostUsers], (req: Request, res: Response) => postUser(req, res));

  router.put("/user/:id", [verifyToken, validateAdmin, validatePutUsers], (req: Request, res: Response) => putUser(req, res));

  router.get("/user/hash/:hash", (req: Request, res: Response) => isHashValid(req, res));

  router.post("/user/pass/reset", [verifyToken, validateAdmin, validatePostPassReset], (req: Request, res: Response) => resetPassword(req, res));

  router.post("/user/pass/:hash", validatePostPass,(req: Request, res: Response) => postPass(req, res));
  
  router.get("/document", verifyToken, (req: Request, res: Response) => getFiles(req, res));

  router.get("/document/download", [verifyToken, validateDownload], (req: Request, res: Response) => getFile(req, res));

  router.post("/document/:cuil", [verifyToken, validateAdmin, validateUpload], (req: Request, res: Response) => postFile(req, res));

  app.use(router);
};
