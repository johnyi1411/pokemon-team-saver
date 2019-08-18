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
      searchValue: '',
      pokemons: []
    }
    this.searchOnChange = this.searchOnChange.bind(this);
  }

  componentDidMount() {
    searchPokemonAPI.get(pokemons => {
      pokemons.data.results.forEach(pokemon => {
        pokemon.id = pokemon.url.slice(34, pokemon.url.length - 1);
      })
      this.setState({pokemons: pokemons.data.results});
      });
  }

  searchOnChange(value) {
    let allowedChars = helperFunctions.lowerCaseAlphabet().concat(['-']);
    let lowerCaseValue = value.toLowerCase();
    for (let i = 0; i < lowerCaseValue.length; i++) {
      if (!allowedChars.includes(lowerCaseValue[i])) {
        this.setState({ searchValue: 'Error' })
        return;
      }
    }
    this.setState({ searchValue : lowerCaseValue });
  }

  render() {

    return (
      <div className="App">
        <Search searchOnChange={this.searchOnChange} searchValue={this.state.searchValue}/>
        <CurrentTeam pokemons={this.state.pokemons}/>
      </div>
    );
  }
};

export default App;
