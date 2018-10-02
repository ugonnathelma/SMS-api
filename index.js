import express from "express";
import bodyParser from "body-parser";
import router from './routes'

require("dotenv").config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 5000;

app.use("/api", router);

app.listen(port);

console.log(`Running on port ${port}`);
