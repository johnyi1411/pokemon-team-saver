import React from 'react';
import Search from './components/Search'
import Pokemon from './components/Pokemon'
import searchPokemonAPI from './lib/searchPokemonAPI'
import helperFunctions from './lib/helperFunctions'
import CurrentTeam from './components/CurrentTeam'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      indexView: true
    }
  }

  componentDidMount() {
    // searchPokemonAPI.get(pokemons => {
    //   pokemons.data.results.forEach(pokemon => {
    //     pokemon.id = pokemon.url.slice(34, pokemon.url.length - 1);
    //   })
    //   this.setState({pokemons: pokemons.data.results});
    //   });
  }

  render() {
    let search;
    if (this.state.indexView) {
      search = <button onClick={() => this.setState({indexView: false})}>Create your own team</button>
    } else {
      search = <Search/>
    }

    return (
      <div className="App">
        <CurrentTeam/>
        {search}
      </div>
    );
  }
};

export default App;
