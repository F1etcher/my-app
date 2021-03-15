export const SET_POKEMON = 'SET_POKEMON'
export const SET_ONE_POKEMON = 'SET_ONE_POKEMON'
export const GET_POKEMON = 'GET_POKEMON'
export const GET_ONE_POKEMON = 'GET_ONE_POKEMON'
export const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT'
export const SET_PAGE_SIZE = 'SET_PAGE_SIZE'
export const SET_NEXT_PAGE = 'SET_NEXT_PAGE'
export const SET_PREV_PAGE = 'SET_PREV_PAGE'
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
export const SET_TO_SEARCH = 'SET_TO_SEARCH'


const initialState = {
    pokemon: [],
    one_pokemon: null,
    totalCount: 10,
    pageSize: 20,
    currentPage: 1,
    search: [],
}

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POKEMON:
            return {
                ...state, pokemon: action.pokemons
            }
        case SET_TO_SEARCH:
            return {
                ...state, search: action.search
            }
        case SET_ONE_POKEMON:
            return {
                ...state, one_pokemon: action.pokemon
            }
        case SET_TOTAL_COUNT: {
            return {
                ...state, totalCount: action.count
            }
        }
        case SET_PAGE_SIZE: {
            return {
                ...state, pageSize: action.size
            }
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state, currentPage: action.page
            }
        }
        default:
            return state
    }
}

export const setPokemonsAC = (pokemons) => ({type: SET_POKEMON, pokemons})
export const getPokemonsAC = (limit, offset) => ({type: GET_POKEMON, limit, offset})
export const getOnePokemonAC = (name) => ({type: GET_ONE_POKEMON, name})
export const setOnePokemonAC = (pokemon) => ({type: SET_ONE_POKEMON, pokemon})
export const setTotalCount = (count) => ({type: SET_TOTAL_COUNT, count})
export const setPageSize = (size) => ({type: SET_PAGE_SIZE, size})
export const setNextPage = (next) => ({type: SET_NEXT_PAGE, next})
export const setPrevPage = (prev) => ({type: SET_PREV_PAGE, prev})
export const setCurrentPageAC = (page) => ({type: SET_CURRENT_PAGE, page})
export const setToSearch = (search) => ({type: SET_TO_SEARCH, search})


export default mainReducer