const PokemonService = require('../service/PokemonService');

class PokemonController {
  pokemonService = new PokemonService();
  constructor(pokemonService) {
    this.pokemonService = pokemonService;
  }

  async importPokemons(req, res) {
    const { offset } = req.body;
    const { Authorization } = req.headers;
    const pokemons = await this.pokemonService.importPokemons(offset, Authorization);
    return res.status(200).send({ pokemons });
  }
}

module.exports = PokemonController;