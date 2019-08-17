import React from 'react';

const Pokemon = (props) => {
  return (
    <div>
      <div>
        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.pokemon.id}.png`} alt={props.pokemon.name}></img>
      </div>
      <div>{props.pokemon.name}</div>
      <button>Add</button>
    </div>
  );
};

export default Pokemon;