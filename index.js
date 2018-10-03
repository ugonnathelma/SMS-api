const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

import express from "express";
import bodyParser from "body-parser";
import router from "./routes";

export const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 5000;

app.use("/api", router);

app.listen(port);

console.log(`Running on port ${port}`);
