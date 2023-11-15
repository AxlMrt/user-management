import * as dotenv from 'dotenv';
dotenv.config();

const secrets = {
  HOST: process.env.MYSQL_DB_HOST,
  USER: process.env.MYSQL_DB_USER,
  PASSWORD: process.env.MYSQL_DB_PSWD,
  DB: process.env.MYSQL_DB,
};

export default secrets;
