import express, { Express, Request, Response } from "express";
import cors from "cors"
import dotenv from "dotenv";
import {connect} from "mongoose"
import createUserRoute from "./src/router/user-router";
const port =  process.env.PORT ;


dotenv.config()

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin: "*"}))

app.get("/", (req: Request, res: Response) => {
  res.send(`welcome to my ${process.env.APP_NAME}`);
});

async function startDb() {
  try {
    await connect("mongodb://127.0.0.1:27017/typescript-test");
    console.log("DB connection established!");
  } catch (err) {
    throw new Error("unable to connect to DB");
  }
}

app.use("/api/user", createUserRoute);




app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
  try {
    startDb()
  } catch (error) {
    throw new Error("unable to connect to DB");
  }
  
});
