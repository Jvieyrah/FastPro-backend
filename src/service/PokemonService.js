const getPokemons = require('../axios/config');
const tokenManager = require('../helpers/tokenManager.js');
const StructuredError = require('../errors/StructuredError');
const UserService = require('./UserService');
const axios = require('axios');

class PokemonService {
  constructor() {
    this.url = 'https://pokeapi.co/api/v2';
  }
  importPokemons = async (offset) => {
    try {
      const { data } = await axios(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`);
      const pokemons = data.results.map((pokemon) => ({
        name: pokemon.name,
        id: pokemon.url.slice(25).replace('/', ''),
      }));
      return data;

    } catch (error) {
      throw new StructuredError(error.message, 500);
    }
  }
}

module.exports = PokemonService;
