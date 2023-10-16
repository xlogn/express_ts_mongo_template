import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { AuthController } from "./controller/auth";
import { Log } from "./util/log";
import { Database } from "./util/database";

const LOG = Log.getInstance();

async function main() {
  dotenv.config();
  const PORT: string = process.env.PORT || "8000";

  const MONGO_URI: string = process.env.MONGO_URI || "";

  const isMongoConnectionSuccessful =
    await Database.getInstance().connectToMongoDb(MONGO_URI);

  if (isMongoConnectionSuccessful) {
    await initServer(PORT);
  } else {
    LOG.info("Server couldn't be created.");
  }
}

async function initServer(PORT: string) {
  const app: Express = express();

  app.use(express.json());

  app.use("/auth", AuthController.getInstance().getRouter());

  app.get("/ping", (req: Request, res: Response) => {
    res.send({ msg: "ponsg" });
  });

  app.listen(PORT, () => {
    console.log(`Service up at port ${PORT}`);
  });
}

main();
