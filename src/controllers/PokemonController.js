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

  async getPokemonById(req, res) {
    const { id } = req.params;
    const pokemon = await this.pokemonService.getPokemonById(id);
    return res.status(200).json({ pokemon });
  }
}

module.exports = PokemonController;