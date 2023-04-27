const maxData = 60
const limit = 10
let offset = 0

const pokeList = document.querySelector('#pokeList')
const loadMore = document.querySelector('#loadMore')
const detailModal = document.querySelector('#detail-modal')

function pokemonComponent(pokemon) {
  return `
    <li class="pokemon ${pokemon.type}" onclick='openDetailModal(${JSON.stringify(pokemon)})'>
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

function openDetailModal(pokemon) {
  detailModal.classList.add(pokemon.type)
  detailModal.innerHTML = `
    <button class="detail-close" onclick="closeDetailModal()">×</button>
    <div class="detail-content">
      <div class="content-header">
        <h4>${pokemon.name}</h4>
        ${pokemon.types.map(type => `<span class='type ${type}' >${type}</span>`).join('')}
      </div>
      <img src="${pokemon.img}" alt="${pokemon.name}" />
      <ul class="stats">
        ${pokemon.stats.map(stat => (`
          <li>
            ${stat.stat_name}
            <progress value='${stat.base_stat}' max="100" />
          </li>
        `)).join('')}
      </ul>
    </div>
  `
  detailModal.showModal()
}

function closeDetailModal() {
  detailModal.removeAttribute('class')
  detailModal.close()
}
