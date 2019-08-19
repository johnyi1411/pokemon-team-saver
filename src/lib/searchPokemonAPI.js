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
    axios.post('/getPokemon', {
      data: {
        input: pokemonName
      }
    })
      .then(response => {
        callback(response);
      })
      .catch(error => {
        console.log('Error retrieving searched pokemon', error);
      })
    // fetch(`/getPokemon?input=${pokemonName}`)
    //   .then((response) => {
    //     callback(response);
    //   })
    //   .then((error) => {
    //     console.log('Error retrieving searched pokemon', error);
    //   });

  }
};

export default searchPokemonAPI;