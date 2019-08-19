import React from 'react';

const Pokemon = (props) => {
  let button;
  if (props.searchedPokemon) {
    button = <button onClick={() => props.addToCurrentTeam(props.pokemon)}>Add</button>
  } else {
    button = <button onClick={() => props.deletePokemon(props.pokemon)}>Delete</button>
  }

  return (
    <div className="pokemon">
      <div>
        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.pokemon.id}.png`} alt={props.pokemon.name}></img>
      </div>
      <div>{props.pokemon.name}</div>
        {button}
    </div>
  );
};

export default Pokemon;