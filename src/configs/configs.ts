import dotenv from "dotenv";

dotenv.config();
export const configs = {
  port: process.env.PORT || 3000,
  mongoURL: process.env.MONGO_DB_URL,
  hash_rounds: process.env.HASH_ROUNDS || 10,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES,
  JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES,
};
