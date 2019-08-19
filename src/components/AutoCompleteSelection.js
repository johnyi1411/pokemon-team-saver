import React from 'react';

const AutoCompleteSelection = (props) => {
  return (
    <p onClick={() => props.changeSearchedPokemon(props.pokemon)}>{props.pokemon}</p>
  );
};

export default AutoCompleteSelection;