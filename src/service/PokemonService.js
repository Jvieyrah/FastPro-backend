const getPokemons = require('../axios/config');
const tokenManager = require('../helpers/tokenManager.js');
const StructuredError = require('../errors/StructuredError');
const PokemonService = require('../service/PokemonService');

class UserService {
  importPokemons = async (offset, token) => {
    const isUser = PokemonService.validateLogin(token);
    if (!isUser) throw new StructuredError('User not found', 404);
    const response = await getPokemons.get(`/pokemon?limit=10&offset=${offset}`);
    const { results } = response.data;
    const pokemons = results.map((pokemon) => ({
      name: pokemon.name,
      id: pokemon.url.slice(25).replace('/', ''),
    }));
    return pokemons;
  }
}

module.exports = UserService;