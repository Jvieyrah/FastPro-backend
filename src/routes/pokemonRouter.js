const { Router } = require('express');
const PokemonController = require('../controllers/PokemonController');
const PokemonService = require('../service/PokemonService');
const authCheck = require('../middleware/authCheck.js');

const pokemonRouter = Router();
const pokemonService = new PokemonService();

const pokeCI = new PokemonController(pokemonService);

//crie uma rota com o método GET que receba um offset como query string e um token
//e retorne uma lista de pokemons
pokemonRouter.get('/pokemons?offset=:offset',
  authCheck,
  (req, res) => pokeCI.importPokemons(req, res));

module.exports = pokemonRouter;