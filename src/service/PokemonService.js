const getPokemons = require('../axios/config');
const StructuredError = require('../errors/StructuredError');
const axios = require('axios');

class PokemonService {
  importPokemons = async (offset) => {
    try {
      await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20')
        .then((response) => {
          return response.data.results;
        });
      // const pokemons = data.results.map((pokemon) => ({
      //   name: pokemon.name,
      //   id: pokemon.url.slice(25).replace('/', ''),
      // }));   

    } catch (error) {
      throw new StructuredError(error.message, 500);
    }
  }
}

module.exports = PokemonService;
