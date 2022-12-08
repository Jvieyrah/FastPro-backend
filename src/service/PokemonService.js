const getPokemons = require('../axios/config');
const tokenManager = require('../helpers/tokenManager.js');
const StructuredError = require('../errors/StructuredError');
const UserService = require('./UserService');
const axios = require('axios').default;

class PokemonService {
  constructor() {
    this.url = 'https://pokeapi.co/api/v2';
  }
  importPokemons = async (offset) => {
    const response = await axios
      .get(`${this.url}/pokemon?limit=10&offset=${offset}`);
    const { results } = response;
    const pokemons = results.map((pokemon) => ({
      name: pokemon.name,
      id: pokemon.url.slice(25).replace('/', ''),
    }));
    return ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
  }
}

module.exports = PokemonService;
