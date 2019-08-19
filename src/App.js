import React from 'react';
import Search from './components/Search'
import CurrentTeam from './components/CurrentTeam'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      indexView: true,
      currentTeam: [
        {
          name: 'charizard',
          url: 'https://pokeapi.co/api/v2/pokemon/6/',
          id: 6
        },
        {
          name: 'charizard',
          url: 'https://pokeapi.co/api/v2/pokemon/6/',
          id: 6
        },
        {
          name: 'charizard',
          url: 'https://pokeapi.co/api/v2/pokemon/6/',
          id: 6
        },
        {
          name: 'charizard',
          url: 'https://pokeapi.co/api/v2/pokemon/6/',
          id: 6
        },
        {
          name: 'charizard',
          url: 'https://pokeapi.co/api/v2/pokemon/6/',
          id: 6
        },
        {
          name: 'charizard',
          url: 'https://pokeapi.co/api/v2/pokemon/6/',
          id: 6
        },
      ]
    }
    this.addToCurrentTeam = this.addToCurrentTeam.bind(this);
    this.clearTeam = this.clearTeam.bind(this);
    this.deletePokemon = this.deletePokemon.bind(this);
  }

  addToCurrentTeam (pokemon) {
    if (this.state.currentTeam.length < 6) {
      let newTeam = this.state.currentTeam.map(pokemon => pokemon);
      newTeam.push({
        name: pokemon.name,
        id: pokemon.id
      });
      this.setState({currentTeam: newTeam});
    }
  }

  clearTeam () {
    this.setState({currentTeam: []});
  }

  deletePokemon (deletedPokemon) {
    let newTeam = [];
    this.state.currentTeam.forEach(pokemon => {
      if (pokemon.name !== deletedPokemon.name) {
        newTeam.push(pokemon);
      }
    });
    this.setState({currentTeam: newTeam});
  }

  render() {
    let search;
    if (this.state.indexView) {
      search = <button onClick={() => this.setState({indexView: false})}>Create your own team</button>
    } else {
      search = <Search addToCurrentTeam={this.addToCurrentTeam}/>
    }

    return (
      <div className="App">
        <CurrentTeam pokemons={this.state.currentTeam} clearTeam={this.clearTeam} deletePokemon={this.deletePokemon}/>
        {search}
      </div>
    );
  }
};

export default App;
