const { Router } = require('express');
const UserController = require('../controllers/UserController');
const UserService = require('../service/UserService');
const authCheck = require('../middleware/authCheck.js');
const userCheck = require('../middleware/userCheck');

const userRouter = Router();
const userService = new UserService();

const userCI = new UserController(userService);

userRouter.post('/login', (req, res) => userCI.login(req, res));
userRouter.get('/validate', authCheck, (req, res) => userCI.validateLogin(req, res));
userRouter.post('/signup', userCheck, (req, res) => userCI.createUser(req, res));

module.exports = userRouter;