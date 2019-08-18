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
      pokemons: [
        {
          name: "bulbasaur",
          url: "https://pokeapi.co/api/v2/pokemon/1/",
          id: "1"
        }
      ]
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
    let pokemons = [];
    this.state.pokemons.forEach((pokemon, index) => {
      if (pokemon.name.includes(this.state.searchValue)) {
        pokemons.push(<Pokemon key={index} pokemon={pokemon}/>)
      }
    });

    return (
      <div className="App">
        <Search searchOnChange={this.searchOnChange} searchValue={this.state.searchValue}/>
        <div className="pokemontable">
          <CurrentTeam pokemons={this.state.pokemons}/>
        </div>
        {/* <div className="pokemontable">
          {pokemons}
        </div> */}
      </div>
    );
  }
};

export default App;
