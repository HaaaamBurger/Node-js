import { config } from "dotenv";
config();

export const configs = {
  DB_URI: process.env.DB_URI,
  PORT: "4445",
  SECRET_SALT: process.env.SECRET_SALT,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
};
