import React from 'react';
import Trainer from './Trainer';
import Pokemon from './Pokemon';

class CurrentTeam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trainer: {}
    }
  }

  render () {
    this.props.pokemons.forEach((pokemon, index) => {
      pokemons.push(<Pokemon searchedPokemon={false} key={index} pokemon={pokemon} deletePokemon={this.props.deletePokemon}/>)
    });
    return (
      <div className="currentteam">
        <Trainer/>
        <div className="pokemontable">
          {pokemons}
        </div>
        <button onClick={this.props.clearTeam}>Clear Team</button>
      </div>
    );
  }
};

export default CurrentTeam;