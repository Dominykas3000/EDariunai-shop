import { MongoClient } from "mongodb";
const MONGODB_URI = process.env.MONGODB_URI;
let client: any = null;

export async function connectToDatabase() {
  if (client) {
    return client;
  }

  if (!MONGODB_URI) {
    console.log("MongoDb URI not found.");
    return; // Add a return statement here to exit the function if MONGODB_URI is undefined
  }

  try {
    client = await MongoClient.connect(MONGODB_URI);
    console.log("Connected to MongoDb successfully.");

    // Add a function to close the connection when the script exits or is interrupted
    process.on("exit", async () => {
      if (client) {
        await client.close();
        console.log("MongoDb connection closed.");
      }
    });

    return client;
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}
