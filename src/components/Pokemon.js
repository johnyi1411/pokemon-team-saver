import React from 'react';

const Pokemon = (props) => {
  let addButton;
  if (props.searchedPokemon) {
    addButton = <button>Add</button>
  }

  return (
    <div className="pokemon">
      <div>
        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.pokemon.id}.png`} alt={props.pokemon.name}></img>
      </div>
      <div>{props.pokemon.name}</div>
        {addButton}
    </div>
  );
};

export default Pokemon;