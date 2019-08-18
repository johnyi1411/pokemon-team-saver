import React from 'react';

const Search = (props) => {
  let badSearch;
  
  if (props.searchValue === 'Error') {
    badSearch = <p id="searcherror">Only letters and '-' allowed</p>
  }

  return (
    <div>
      <input type="text" onChange={(e) => props.searchOnChange(e.target.value)}></input>
      {badSearch}
    </div>
  );
}

export default Search;