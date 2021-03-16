export const ADD_FAVORITE_POKEMON = 'ADD_FAVORITE_POKEMON'
export const CLEAR_FAVORITE_POKEMON = 'CLEAR_FAVORITE_POKEMON'


const initialState = {
    favoritePokemons: []
}

const favoriteReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FAVORITE_POKEMON: {
            const foundItem = state.favoritePokemons.find(e => e.id === action.add.id)
            if(foundItem) return {
                ...state,
                favoritePokemons: [...state.favoritePokemons.filter(e => e.id !== action.add.id)]
            }
            return {
                ...state, favoritePokemons: [...state.favoritePokemons, {...action.add}]
            }
        }
        case CLEAR_FAVORITE_POKEMON:
            return {
                ...state, favoritePokemons: []
            }
        default:
            return state
    }
}

export const addFavoritePokemon = (add) => ({type: ADD_FAVORITE_POKEMON, add})
export const clearFavoritePokemon = () => ({type: CLEAR_FAVORITE_POKEMON,})

export default favoriteReducer