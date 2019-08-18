import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ''
    }
  } 
  render () {
    let badSearch;
    
    if (this.props.searchValue === 'Error') {
      badSearch = <p id="searcherror">Only letters, numbers and '-' allowed</p>
    }
    return (
      <div>
        <input type="text" onChange={(e) => this.props.searchOnChange  (e.target.value)}></input>
        {badSearch}
      </div>
    );
  }
}

export default Search;