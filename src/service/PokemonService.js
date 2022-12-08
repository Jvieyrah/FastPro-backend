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
    try {
      const response = await axios
        .get(`${this.url}/pokemon?limit=10&offset=${offset}`)
        .then((response) => {
          const { results } = response.data.results
          return results;
        }
        )
    } catch (error) {
      throw new StructuredError(error.message, 500);
    }
    // const pokemons = results.map((pokemon) => ({
    //   name: pokemon.name,
    //   id: pokemon.url.slice(25).replace('/', ''),
    //  }));
    // return results;
  }
}

module.exports = PokemonService;
