import React from 'react';
import Trainer from './Trainer';
import Pokemon from './Pokemon';

class CurrentTeam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemons: [
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
      ],
      trainer: {}
    }
  }



  render () {
    let pokemons = [];
    this.state.pokemons.forEach((pokemon, index) => {
      pokemons.push(<Pokemon key={index} pokemon={pokemon}/>)
    });
    return (
      <div className="currentteam">
        <Trainer/>
        <div>
          {pokemons}
        </div>
      </div>
    );
  }
};

export default CurrentTeam;