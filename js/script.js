document.addEventListener("DOMContentLoaded", function() {
    const pokedex = document.getElementById("pokedex");
    const searchButton = document.getElementById("searchButton");
    const searchInput = document.getElementById("searchInput");
    const apiUrl = "https://pokeapi.co/api/v2/pokemon";
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

    async function fetchPokemonDetails(url) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Erro ao buscar detalhes do Pokémon: " + error);
        }
    }

    async function displayPokemon(url) {
        pokemonData = await fetchPokemonData(url);
        pokedex.innerHTML = "";

        for (const pokemon of pokemonData) {
            const response = await fetch(pokemon.url);
            const data = await response.json();
            const name = data.name;
            const imageUrl = data.sprites.front_default;
            const pokemonDetails = await fetchPokemonDetails(data.species.url);
            const flavorText = pokemonDetails.flavor_text_entries.find(entry => entry.language.name === "en").flavor_text;

            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                <img src="${imageUrl}" alt="${name}">
                <h2>${name}</h2>
                <p>${flavorText}</p>
            `;

            pokedex.appendChild(card);
        }
    }

    // Função para carregar todos os Pokémon ao carregar a página
    async function loadAllPokemon() {
        const allPokemonUrl = `${apiUrl}?limit=1000`; // Ajuste o limite conforme necessário
        await displayPokemon(allPokemonUrl);
    }

    // Carregar todos os Pokémon ao carregar a página
    loadAllPokemon();

    // Adicionar evento de input ao campo de pesquisa para pesquisa em tempo real
    searchInput.addEventListener("input", function() {
        displayPokemon(apiUrl); // Atualiza os Pokémon conforme o usuário digita
    });
});

//filtro

document.addEventListener("DOMContentLoaded", function() {
    // ... (seu código existente) ...

    const filterButton = document.getElementById("filterButton");

    filterButton.addEventListener("click", async function() {
        const searchTerm = "pikachu"; // Substitua "pikachu" pelo critério de filtro desejado
        const filteredPokemon = pokemonData.filter(pokemon => pokemon.name.includes(searchTerm));
        await displayFilteredPokemon(filteredPokemon);
    });

    async function displayFilteredPokemon(filteredPokemon) {
        pokedex.innerHTML = "";

        for (const pokemon of filteredPokemon) {
            const response = await fetch(pokemon.url);
            const data = await response.json();
            const name = data.name;
            const imageUrl = data.sprites.front_default;
            const pokemonDetails = await fetchPokemonDetails(data.species.url);
            const flavorText = pokemonDetails.flavor_text_entries.find(entry => entry.language.name === "en").flavor_text;

            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                <img src="${imageUrl}" alt="${name}">
                <h2>${name}</h2>
                <p>${flavorText}</p>
            `;

            pokedex.appendChild(card);
        }
    }
});


// aqui e a pokedex
const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const pokemonHeight = document.querySelector('.pokemon__height');  // Novo elemento para mostrar altura

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

const renderPokemon = async (pokemon) => {

  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';
  pokemonHeight.innerHTML = '';  // Limpa a altura ao carregar um novo Pokémon
  pokemonImage.style.display = 'block';  // Exibe a imagem ao carregar um novo Pokémon

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = `#${data.id}`;
    pokemonHeight.innerHTML = `Height: ${data.height / 10} m`;  // Define a altura
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not found :c';
    pokemonNumber.innerHTML = '';
    pokemonHeight.innerHTML = '';
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

renderPokemon(searchPokemon);



