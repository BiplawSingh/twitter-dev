import dotenv from "dotenv";

dotenv.config();

const {
  PORT,
  SECRET_KEY,
  URI,
  AWS_REGION,
  SECRET_ACCESS_KEY,
  ACCESS_KEY_ID,
  BUCKET_NAME,
} = process.env;

export {
  PORT,
  SECRET_KEY,
  URI,
  AWS_REGION,
  SECRET_ACCESS_KEY,
  ACCESS_KEY_ID,
  BUCKET_NAME,
};
