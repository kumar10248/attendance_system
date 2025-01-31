import express, { Response } from "express";
import "dotenv/config.js";
import userRoute from "./routes/user.routes.js";


const app = express();
app.use(express.json());


import "./connection.js";

app.get("/", (_, res: Response) => {
  res.send("Hello World");
});

app.use("/",userRoute)


export default app;
