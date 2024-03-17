import mongoose from "mongoose";
import { logger } from "./helpers";
import { log } from "console";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  console.log("connecting to database");
  if (isConnected) {
    console.log("using existing connection");
    return;
  }

  logger.info("using new connection");

  try {
    const mongoUri: string = process.env.MONGODB_URI || "";
    await mongoose.connect(mongoUri, {
      dbName: process.env.DBNAME,
    });

    isConnected = true;

    logger.info("connected to database");
  } catch (error) {
    logger.error("error connecting to database");
    logger.error(error);
  }
};
