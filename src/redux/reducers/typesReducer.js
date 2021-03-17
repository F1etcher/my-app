export const ADD_ALL_TYPES = 'ADD_ALL_TYPES'

const initialState = {
    types: []
}

const typesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ALL_TYPES:
            return {
                ...state, types: {...action.types}
            }
        default:
            return state
    }
}

export const getTypesPokemons = (types) => ({type: ADD_ALL_TYPES, types})


export default typesReducer