import React from 'react';
import helperFunctions from '../lib/helperFunctions'
import searchPokemonAPI from '../lib/searchPokemonAPI'
import AutoCompleteSelection from './AutoCompleteSelection';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      pokemons: [],
      autoSearchFirstFive: []
    }
    this.searchOnChange = this.searchOnChange.bind(this);
    this.autoCompleteGenerator = this.autoCompleteGenerator.bind(this);
  }

  componentDidMount() {
    searchPokemonAPI.getAll(pokemons => {
      this.setState({pokemons: pokemons.data.results});
    });
  }

  searchOnChange(value) {
    let allowedChars = helperFunctions.lowerCaseAlphabet().concat(['-']);
    allowedChars = allowedChars.concat(helperFunctions.numbersInString());
    let lowerCaseValue = value.toLowerCase();
    for (let i = 0; i < lowerCaseValue.length; i++) {
      if (!allowedChars.includes(lowerCaseValue[i])) {
        this.setState({ searchValue: 'Error' })
        return;
      }
    }
    this.setState({ searchValue : lowerCaseValue }, this.autoCompleteGenerator);
  }

  autoCompleteGenerator () {
    if (this.state.searchValue.length > 0 && this.state.searchValue !== 'Error') {
      let matches = [];
      for (let i = 0; i < this.state.pokemons.length; i++) {
        if (this.state.pokemons[i].name.includes(this.state.searchValue)) {
          matches.push(this.state.pokemons[i].name);
        }
      }
      this.setState({autoSearchFirstFive: matches.slice(0, 5)});
    } else {
      return;
    }
  }

  render () {
    let badSearch;
    
    if (this.state.searchValue === 'Error') {
      badSearch = <p id="searcherror">Only letters, numbers and '-' allowed</p>
    }

    let autoCompletes = [];

    for (let i = 0; i < this.state.autoSearchFirstFive.length; i++) {
      autoCompletes.push(
        <AutoCompleteSelection pokemon={this.state.autoSearchFirstFive[i]}/>
      )
    }

    return (
      <div>
        <input type="text" onChange={(e) => this.searchOnChange  (e.target.value)}></input>
        <button>Find Pokemon</button>
        {badSearch}
        {autoCompletes}
      </div>
    );
  }
}

export default Search;