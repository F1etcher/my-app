export const GET_ALL_TYPES = 'GET_ALL_TYPES'
export const ADD_ALL_TYPES = 'ADD_ALL_TYPES'
export const CHANGE_TYPES_STATE = 'CHANGE_TYPES_STATE'
export const SUITABLE_POKEMONS = 'SUITABLE_POKEMONS'

const initialState = {
    types: [],
    typesState: {},
    allSuitablePokemons: []
}

const typesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ALL_TYPES:
            return {
                ...state, types: [...action.types]
            }
        case CHANGE_TYPES_STATE:
            return {
                ...state, typesState: {...action.state}
            }
        case SUITABLE_POKEMONS:
            return {
                ...state, allSuitablePokemons: [...action.suitablePokemons]
            }
        default:
            return state
    }
}

export const getTypesPokemons = () => ({type: GET_ALL_TYPES})
export const setTypesPokemons = (types) => ({type: ADD_ALL_TYPES, types})
export const changeTypesState = (state) => ({type: CHANGE_TYPES_STATE, state})
export const changeSuitable = (suitablePokemons) => ({type: SUITABLE_POKEMONS, suitablePokemons})


export default typesReducer