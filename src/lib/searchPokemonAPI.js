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
  }
};

export default searchPokemonAPI;