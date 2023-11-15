import mysql from 'mysql2/promise';
import secrets from '../db.config.js';

const pool = mysql.createPool({
  host: secrets.HOST,
  user: secrets.USER,
  password: secrets.PASSWORD,
  database: secrets.DB,
});

export default pool;
