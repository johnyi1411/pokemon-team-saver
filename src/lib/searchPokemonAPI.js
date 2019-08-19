const axios = require('axios');

const searchPokemonAPI = {
  getAll: (callback) => {
    axios.get('/getAllPokemon')
      .then(response => {
        callback(response);
      })
      .catch(error => {
        console.log('Error retreiving all pokemons', error);
      });
  },

  getOne: (pokemonName, callback) => {
    axios.get('/getPokemon', { param: {
      input: pokemonName
    }})
      .then(response => {
        callback(response);
      })
      .catch(error => {
        console.log('Error retrieving searched pokemon', error);
      })
  }
};

export default searchPokemonAPI;