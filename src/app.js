require('express-async-errors');
const express = require('express');
const userRouter = require('./routes/userRouter');
const pokemonRouter = require('./routes/pokemonRouter');
const cors = require('cors');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();
app.use(cors());
app.use(express.json());
app.get('/helloAPI', (_req, res) => res.status(418).send({ message: 'Hello User' }));
app.use('/', userRouter);
app.use('/pokemons', pokemonRouter);
app.use(errorMiddleware);

module.exports = app;
