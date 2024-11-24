let currentPokemonId = 1; // Inicializamos con el ID del primer Pokémon

// Función para obtener datos del Pokémon por ID
async function fetchPokemon(id) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!response.ok) {
      throw new Error(`Pokémon con ID ${id} no encontrado`);
    }
    const data = await response.json();
    displayPokemon(data);
  } catch (error) {
    console.error(error.message);
    document.getElementById("pokemon-name").textContent =
      "Pokémon no encontrado";
    document.getElementById("pokemon-image").src = "";
    document.getElementById("pokemon-id").textContent = "";
  }
}

// Función para mostrar los datos del Pokémon
function displayPokemon(pokemon) {
  document.getElementById("pokemon-name").textContent =
    pokemon.name.toUpperCase();
  document.getElementById("pokemon-image").src = pokemon.sprites.front_default;
  document.getElementById("pokemon-id").textContent = `ID: ${pokemon.id}`;
}

// Evento del botón "Siguiente"
document.getElementById("next-button").addEventListener("click", () => {
  currentPokemonId++;
  fetchPokemon(currentPokemonId);
});

// Evento del botón "Anterior"
document.getElementById("previous-button").addEventListener("click", () => {
  if (currentPokemonId > 1) {
    currentPokemonId--; // Decrementa solo si el ID es mayor que 1
    fetchPokemon(currentPokemonId);
  } else {
    alert("No hay Pokémon anteriores al primero.");
  }
});

// Cargar el primer Pokémon al inicio
fetchPokemon(currentPokemonId);
