const { Router } = require('express');
const PokemonController = require('../controllers/PokemonController');
const PokemonService = require('../service/PokemonService');
const authCheck = require('../middleware/authCheck.js');

const pokemonRouter = Router();
const pokemonService = new PokemonService();

const pokeCI = new PokemonController(pokemonService);

pokemonRouter.get('/',
  authCheck,
  (req, res) => pokeCI.importPokemons(req, res));

pokemonRouter.get('/:id',
  authCheck,
  (req, res) => pokeCI.getPokemonById(req, res));

module.exports = pokemonRouter;