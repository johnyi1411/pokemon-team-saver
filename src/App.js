import React from 'react';
import Search from './components/Search'
import Pokemon from './components/Pokemon'
import searchPokemonAPI from './lib/searchPokemonAPI'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      pokemons: [
        {
          name: 'scyther',
          id: 123
        }
      ]
    }
    this.searchOnChange = this.searchOnChange.bind(this);
  }

  componentDidMount() {
    searchPokemonAPI.get(pokemons => this.setState({pokemons}));
  }
  

  searchOnChange(value) {
    this.setState({ searchValue : value });
  }

  render() {
    let pokemons = [];
    this.state.pokemons.forEach((pokemon, index) => {
      if (pokemon.name.includes(this.state.searchValue)) {
        pokemons.push(<Pokemon key={index} pokemon={pokemon}/>)
      }
    })

    return (
      <div className="App">
        <Search searchOnChange={this.searchOnChange}/>
        <div>
          {/* <CurrentTeam/> */}
        </div>
        <div>
          {pokemons}
        </div>
      </div>
    );
  }
};

export default App;
