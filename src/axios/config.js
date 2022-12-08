const axios = require('axios').default;

const getPokemons = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});

module.exports = getPokemons;