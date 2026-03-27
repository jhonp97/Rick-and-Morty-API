import dotenv from 'dotenv';
dotenv.config();

const config = {
  port: process.env.PORT || 5000,
  dbUrl: process.env.DB_URL,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  CLUSTER: process.env.CLUSTER,
  DATABASE: process.env.DATABASE
};

export default config;