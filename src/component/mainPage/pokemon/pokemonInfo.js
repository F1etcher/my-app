import React, {useEffect} from "react"
import pokemonTypes from '../../../helpers/pokemonTypes'
import './style.css'
import {useDispatch, useSelector} from "react-redux";
import {getOnePokemonAC} from "../../../redux/reducers/mainReducer";


const PokemonInfo = () => {
    const dispatch = useDispatch()
    const res = useSelector(state => state.mainPage.one_pokemon )
    useEffect(() => {
        let queryId = document.location.search.split('=')
        dispatch(getOnePokemonAC(queryId[1]))
    }, []);

    return (
        <>
            {!res ?
                <div>Loading</div>
                :
                <div className='Card'>
                    < div className='Card__img'>
                        <img src={res.sprites.front_default || null} alt=''/>
                    </div>
                    <div className='Card__name'>{res.name}</div>
                    <div className='Card__tupes'>
                        {res.types.map(el =>
                            <div className='Card__type' key={el.type.name} style={{backgroundColor: pokemonTypes[el.type.name]}}>
                                {el.type.name}
                            </div>
                        )}
                    </div>
                    <div className='Card__info'>
                        <div className='Card__data Card__data--weight'>
                            <p className='title'>Weight</p>
                            <p>{res.weight}</p>
                        </div>
                        <div className='Card__data Card__data--height'>
                            <p className='title'>Height</p>
                            <p>{res.height}</p>
                        </div>
                        <div className='Card__data Card__data--ability'>
                            <p className='title'>Ability</p>
                            <p>{res.abilities[0].ability.name}</p>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}


export default PokemonInfo