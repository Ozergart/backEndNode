import dotenv from "dotenv";

dotenv.config();
export const configs = {
  port: process.env.PORT || 3000,
  mongoURL: process.env.MONGO_DB_URL,
};
