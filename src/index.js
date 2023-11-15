import express from 'express';
import cors from 'cors';
import pool from '../config/db/db.js';
import usersTable from '../config/db/tables/user-table.js';

import usersRoutes from './routes/users.routes.js';

const app = express();
const PORT = process.env.PORT || 8000;
const baseUrl = '/api/v1';

const corsOptions = {
  origin: 'http://localhost:5174',
};

app.use(express.json());
app.use(cors(corsOptions));

app.use(`${baseUrl}`, usersRoutes);

app.listen(PORT, async () => {
  console.log(`Running on port: ${PORT}`);

  try {
    const connection = await pool.getConnection();
    await connection.query(usersTable);
    connection.release();
    console.log('Connected to the database.');
  } catch (error) {
    console.error('Error creating users table:', error);
  }
});
export default app;
