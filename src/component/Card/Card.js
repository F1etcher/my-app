import React from 'react';
import './style.css'
import pokemonTypes from "../../helpers/pokemonTypes";

function Card (pokemon) {
    return (
        <div className='Card'>
            <div className='Card__img'>
                <img src={pokemon.pokemonData.sprites.front_default} alt=''/>
            </div>
            <div className='Card__name'>{pokemon.pokemonData.name}</div>
            <div className='Card__tupes'>
                {pokemon.pokemonData.types.map(type => {
                    return(
                        <div className='Card__type' key={type.type.name} style={{backgroundColor: pokemonTypes[type.type.name]}}>
                            {type.type.name}
                        </div>)
                })}
            </div>
            <div className='Card__info'>
                <div className='Card__data Card__data--weight'>
                    <p className='title'>Weight</p>
                    <p>{pokemon.pokemonData.weight}</p>
                </div>
                <div className='Card__data Card__data--height'>
                    <p className='title'>Height</p>
                    <p>{pokemon.pokemonData.height}</p>
                </div>
                <div className='Card__data Card__data--ability'>
                    <p className='title'>Ability</p>
                    <p>{pokemon.pokemonData.abilities[0].ability.name}</p>
                </div>
            </div>
        </div>
    )
}

export default Card;