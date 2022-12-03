require('express-async-errors');
const express = require('express');
const userRouter = require('./routes/userRouter');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();
app.use(express.json());
app.get('/helloAPI', (_req, res) => res.status(418).send({ message: 'Hello User' }));
app.use('/', userRouter);
app.use(errorMiddleware);

module.exports = app;
