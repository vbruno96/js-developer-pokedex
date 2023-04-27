const maxData = 60
const limit = 10
let offset = 0

const pokeList = document.querySelector('#pokeList')
const loadMore = document.querySelector('#loadMore')

function pokemonComponent(pokemon) {
  return `
    <li class="pokemon ${pokemon.type}">
      <span class="number">#${pokemon.id}</span>
      <span class="name">${pokemon.name}</span>

      <div class="detail">
          <ol class="types">
          ${pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join('')}
          </ol>

          <img src="${pokemon.img}"
              alt="${pokemon.name}">
      </div>
    </li>
  `
}

function loadData(offset, limit) {
  api.getPokemons(offset, limit)
    .then((pokemons = []) => {
      const newPokeList = pokemons.map(pokemonComponent).join('')
      pokeList.innerHTML += newPokeList
    })
}

loadData(offset, limit)

function loadMorePokemons() {
  const newOffset = offset + limit
  offset = newOffset
  const qtdDataWithNextPage = newOffset + limit

  if (qtdDataWithNextPage >= maxData) {
    const newLimit = maxData - offset
    console.log(`offset: ${offset}; limit:${newLimit}`)
    loadData(offset, newLimit)
    loadMore.parentElement.removeChild(loadMore)
  } else {
    loadData(offset, limit)
  }
}
