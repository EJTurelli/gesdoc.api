import express from 'express';
import { routes as initRoutes } from "./routes";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

initRoutes(app);

module.exports = app;