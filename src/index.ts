import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";

import baseRoutes from "./routes/index";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use("/", baseRoutes);
app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
