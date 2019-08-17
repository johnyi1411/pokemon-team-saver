import React from 'react';

const Search = (props) => {
  return (
    <div>
      <input type="text" onChange={(e) => props.searchOnChange(e.target.value)}></input>
    </div>
  );
}

export default Search;