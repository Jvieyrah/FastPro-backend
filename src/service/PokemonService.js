const getPokemons = require('../axios/config');
const tokenManager = require('../helpers/tokenManager.js');
const StructuredError = require('../errors/StructuredError');
const UserService = require('./UserService');

class PokemonService {
  importPokemons = async (offset, token) => {
    const userService = new UserService();
    const isUser = userService.validateLogin(token);
    if (!isUser) throw new StructuredError('User not found', 404);
    const response = await getPokemons.get(`/pokemon?limit=10&offset=${offset}`);
    const { results } = response;
    // const pokemons = results.map((pokemon) => ({
    //   name: pokemon.name,
    //   id: pokemon.url.slice(25).replace('/', ''),
    // }));
    return response;
  }
}

module.exports = PokemonService;
