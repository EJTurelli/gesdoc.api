import express from 'express';
import cors from 'cors';
import { routes as initRoutes } from "./routes";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

initRoutes(app);

module.exports = app;