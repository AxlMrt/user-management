import bcrypt from 'bcrypt';
import pool from '../../config/db/db.js';

const getUsers = async (req, res) => {
  try {
    const [rows, fields] = await pool.execute('SELECT * FROM users');

    const usersWithoutPassword = rows.map((user) => {
      const { user_id, firstName, lastName, email } = user;
      return { user_id, firstName, lastName, email };
    });

    res.status(200).json(usersWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: 'Error while fetching /users.' });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const [rows, fields] = await pool.execute(
      `SELECT * FROM users WHERE user_id=${userId}`
    );

    if (!rows) {
      res.status(404).json({ error: 'User not found.' });
    } else {
      const user = rows;
      const { user_id, firstName, lastName, email } = user;
      res.status(200).json({ user_id, firstName, lastName, email });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error while fetching /users/:id.' });
  }
};

const createUser = async (req, res) => {
  const { firstName, lastName, password, email } = req.body;

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.genSalt(saltRounds).then((salt) => {
      return bcrypt.hash(password, salt);
    });

    const [result, _] = await pool.execute(
      `INSERT INTO users(firstName, lastName, password, email) VALUES('${firstName}', '${lastName}', '${hashedPassword}', '${email}')`
    );

    res.status(201).json({ message: 'User created.' });
  } catch (error) {
    res.status(500).json({ error: 'Error while creating /users.' });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { firstName, lastName, email } = req.body;

  try {
    const [result, _] = await pool.execute(
      `UPDATE users SET firstName=${firstName}, lastName=${lastName}, email=${email} WHERE user_id=${userId}`
    );

    if (!result.affectedRows)
      res.status(404).json({ error: 'User not found.' });

    res.status(200).json({ message: 'User updated.' });
  } catch (error) {
    res.status(500).json({ error: 'Error while updating /users/:id.' });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const [result, _] = await pool.execute(
      `DELETE FROM users WHERE user_id=${userId}`
    );

    if (!result.affectedRows)
      res.status(404).json({ error: 'User not found.' });

    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error while deleting /users/:id' });
  }
};

const _ = {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
};

export default _;
