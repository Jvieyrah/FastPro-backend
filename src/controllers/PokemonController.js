const PokemonService = require('../service/PokemonService');

class PokemonController {
  pokemonService = new PokemonService();
  constructor(pokemonService) {
    this.pokemonService = pokemonService;
  }

  async importPokemons(req, res) {
    const { offset } = req.body;
    const pokemons = await this.pokemonService.importPokemons(offset);
    return res.status(200).json({ pokemons });
  }
}

module.exports = PokemonController;