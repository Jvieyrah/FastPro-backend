const getPokemons = require('../axios/config');
const StructuredError = require('../errors/StructuredError');
const axios = require('axios');

class PokemonService {
  async importPokemons(offset) {
    const pokemons = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=10`)
      .then((response) => response.data.results.map(({ name, url }) => ({ name, id: url.slice(34, -1).replace('/', '') })))
      .catch((error) => { throw new StructuredError(error.message, 500) });
    return pokemons;
  }
}

module.exports = PokemonService;
