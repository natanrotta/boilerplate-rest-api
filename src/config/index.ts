import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export const config = {
  api: {
    port: parseInt(process.env.API_PORT || "3333"),
    allowedOrigin: process.env.ALLOWED_ORIGIN,
    projectName: process.env.PROJECT_NAME || "boilerplate-rest-api",
  },
  redis: {
    host: process.env.REDIS_HOST || "localhost",
    port: parseInt(process.env.REDIS_PORT || "6379"),
  },
};

export default config;
