import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import fs from "fs";
import morgan from "morgan";
import path from "path";
import * as userRoute from "./routes/user.route.js";

dotenv.config();

const app = express();

app.use(cors({allowedHeaders: ["Content-Type"], origin: "*", preflightContinue: true}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/V1/", userRoute.default);

app.listen(3000);
