import React from 'react';
import './App.css';
import Search from './components/Search'
import Pokemon from './components/Pokemon'

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

  searchOnChange(value) {
    this.setState({ searchValue : value });
  }

  render () {
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
          {pokemons}
        </div>
      </div>
    );
  }
};

export default App;
