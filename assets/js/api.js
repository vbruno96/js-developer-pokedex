function apiDataForPokemonModel(data) {
  const pokemon = new Pokemon()
  pokemon.id = data.id
  pokemon.name = data.name

  const types = data.types.map(typeSlot => typeSlot.type.name)
  const [type] = types

  pokemon.types = types
  pokemon.type = type
  pokemon.img = data.sprites.other.dream_world.front_default
  pokemon.stats = data.stats.map(stat => ({
    base_stat: stat.base_stat,
    stat_name: stat.stat.name
  }))

  return pokemon
}

function getPokemonDetail(pokemon) {
  return fetch(pokemon.url)
    .then(response => response.json())
    .then(apiDataForPokemonModel)
}

const api = {
  getPokemonDetail,
  getPokemons: (offset = 0, limit = 10) => {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}` 

    return fetch(apiUrl)
      .then(response => response.json())
      .then(body => body.results)
      .then(pokemons => pokemons.map(getPokemonDetail))
      .then(detailRequests => Promise.all(detailRequests))
      .then(pokemonDetails => pokemonDetails)
  }
}