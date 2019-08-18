import React from 'react';
import helperFunctions from '../lib/helperFunctions'

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ''
    }
    this.searchOnChange = this.searchOnChange.bind(this);
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
    this.setState({ searchValue : lowerCaseValue });
  }

  render () {
    let badSearch;
    
    if (this.state.searchValue === 'Error') {
      badSearch = <p id="searcherror">Only letters, numbers and '-' allowed</p>
    }
    return (
      <div>
        <input type="text" onChange={(e) => this.searchOnChange  (e.target.value)}></input>
        {badSearch}
      </div>
    );
  }
}

export default Search;