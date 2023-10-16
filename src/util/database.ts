import mongoose from "mongoose";
import { Common } from "../constant/common";
import { Log } from "./log";

export class Database {
  private static instance: Database;
  private readonly LOG;

  private constructor() {
    this.LOG = Log.getInstance();
  }

  public async connectToMongoDb(MONGO_URI: string) {
    try {
      await mongoose.connect(MONGO_URI);
      this.LOG.info("Connected to MongoDB");
      return true;
    } catch (err: unknown) {
      if (err instanceof Error) {
        this.LOG.error(`Not able to connect to MongoDb: ${err.message}`);
      }
      return false;
    }
  }
  public static getInstance() {
    if (Common.isNullOrUndefinedOrEmpty(this.instance)) {
      this.instance = new Database();
    }
    return this.instance;
  }
}
