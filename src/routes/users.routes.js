import express from 'express';
import _ from '../controllers/users.controllers.js';

const router = express.Router();

router.get('/users', _.getUsers);
router.get('/users/:id', _.getSingleUser);
router.post('/users', _.createUser);
router.put('/users/:id', _.updateUser);
router.delete('/users/:id', _.deleteUser);

export default router;
