import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const portfolio_url = process.env.MONGO_URI_2;

if (!portfolio_url) {
  throw new Error("MONGO_URI_2 is not defined in the environment variables");
}

let connection: typeof mongoose;

/**
 * Makes a connection to a MongoDB database. If a connection already exists, does nothing
 * Call this function at the start of API routes and data fetches
 * @returns {Promise<typeof mongoose>}
 */
const connectDBportfolio = async () => {
  if (!connection) {
    connection = await mongoose.connect(portfolio_url);
    return connection;
  }
};

export default connectDBportfolio;
    