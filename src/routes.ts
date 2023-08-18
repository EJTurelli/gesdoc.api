import express, { Request, Response } from 'express';

import { verifyToken } from "./middlewares/auth.middleware";
import { validateLogin } from "./middlewares/validateLogin.middleware";
import { login } from "./controllers/login.controller";

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

  router.get("/document", verifyToken, (req: Request, res: Response) => {
    res.status(200).json({'Document': req.user.surname});
  });

  router.get("/document/:hash", verifyToken, (req: Request, res: Response) => {
    res.status(200).json({'Document': req.params.hash});
  });

  router.post("/document", verifyToken, (req: Request, res: Response) => {
    res.status(200).json({'Document': req.user.surname});
  });

  app.use(router);
};
