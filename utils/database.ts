import mongoose from "mongoose";
import { logger } from "./helpers";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  logger.info("Attempting to connect to database...");

  if (isConnected) {
    logger.info("Using existing database connection.");
    return;
  }

  logger.info("Creating new database connection...");

  try {
    const mongoUri: string = process.env.MONGODB_URI || "";
    await mongoose.connect(mongoUri, {
      dbName: process.env.DBNAME,
    });

    isConnected = true;

    logger.info("Successfully connected to database.");
  } catch (error) {
    logger.error("Error while attempting to connect to database.");
    logger.error(`Error details: ${error}`);
  }
};