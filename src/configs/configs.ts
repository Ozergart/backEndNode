import dotenv from "dotenv";

dotenv.config();
export const configs = {
  port: process.env.PORT || 3000,
  mongoURL: process.env.MONGO_DB_URL,
  hash_rounds: process.env.HASH_ROUNDS || 10,
};
