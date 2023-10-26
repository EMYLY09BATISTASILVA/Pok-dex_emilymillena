document.addEventListener("DOMContentLoaded", function() {
    const pokedex = document.getElementById("pokedex");
    const searchButton = document.getElementById("searchButton");
    const searchInput = document.getElementById("searchInput");
    const apiUrl = "https://pokeapi.co/api/v2/pokemon/";
    let pokemonData = [];

    async function fetchPokemonData(url) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data.results;
        } catch (error) {
            console.error("Erro ao buscar dados dos Pokémon: " + error);
        }
    }

    async function displayPokemon(pokemonData) {
        pokedex.innerHTML = "";

        for (const pokemon of pokemonData) {
            const response = await fetch(pokemon.url);
            const data = await response.json();
            const name = data.name;
            const imageUrl = data.sprites.front_default;

            const card = document.createElement("button");
            card.classList.add("card");
            card.innerHTML = `
                <img src="${imageUrl}" alt="${name}">
                <h2>${name}</h2>
            `;

            pokedex.appendChild(card);
        }
    }

    // Função para buscar Pokémon por nome
    function searchPokemonByName() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredPokemon = pokemonData.filter(pokemon => pokemon.name.includes(searchTerm));
        displayPokemon(filteredPokemon);
    }

    // Função para carregar todos os Pokémon iniciais
    async function loadInitialPokemon() {
        pokemonData = await fetchPokemonData(apiUrl);
        displayPokemon(pokemonData);
    }

    // Carregar todos os Pokémon iniciais ao carregar a página
    loadInitialPokemon();

    // Adicionar evento de clique ao botão de pesquisa
    searchButton.addEventListener("click", searchPokemonByName);
});

const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');


let searchPokemon = 1;



const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}
document.addEventListener("DOMContentLoaded", function() {
    const searchButton = document.getElementById("searchButton");
    const input = document.getElementById("searchInput");
    const pokemonDetails = document.querySelector('.pokemon__details');

    async function fetchPokemonData(pokemon) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Erro ao buscar dados dos Pokémon: " + error);
        }
    }

    async function renderPokemonDetails(pokemon) {
        const data = await fetchPokemonData(pokemon);

        if (data) {
            pokemonDetails.innerHTML = `
                <h2>${data.name}</h2>
                <p>Height: ${data.height}</p>
                <p>Weight: ${data.weight}</p>
                <p>Types: ${data.types.map(type => type.type.name).join(', ')}</p>
                <p>Abilities: ${data.abilities.map(ability => ability.ability.name).join(', ')}</p>
                <p>Moves: ${data.moves.length}</p>
            `;
        } else {
            pokemonDetails.innerHTML = '<p>Pokemon not found.</p>';
        }
    }

    searchButton.addEventListener("click", function() {
        const searchTerm = input.value.toLowerCase();
        renderPokemonDetails(searchTerm);
    });
});


const renderPokemon = async (pokemon) => {

  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not found :c';
    pokemonNumber.innerHTML = '';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});


form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderAllPokemonDetails(input.value.toLowerCase());
});




renderPokemon(searchPokemon);



