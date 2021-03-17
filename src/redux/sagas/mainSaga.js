import {put, takeLatest, all, call, select} from 'redux-saga/effects'
import {
    GET_ONE_POKEMON,
    GET_POKEMON,
    setOnePokemonAC,
    setPokemonsAC,
    setToSearch,
    setTotalCount
} from "../reducers/mainReducer";
import axios from "axios";
import {ADD_ALL_TYPES, getTypesPokemons} from "../reducers/typesReducer";

const url = 'https://pokeapi.co/api/v2/'

function* getPokemons({limit, offset}) {
    try {
        const res = yield call(axios.get, `${url}pokemon?limit=${limit}&offset=${offset}`)
        yield put(setTotalCount(res.data.count))
        const arrToSearch = yield select(state => state.mainPage.search)
        if (arrToSearch <= 0) {
            const Allpok = yield call(axios.get, `${url}pokemon?limit=${res.data.count}&offset=0`)
            const SearchPokemon = Allpok.data.results.map(el => {
                return {
                    value: el.name,
                    label: el.name
                }
            })
            yield put(setToSearch(SearchPokemon))
            localStorage.setItem('SearchPokemon', JSON.stringify(SearchPokemon))
        }
        const pok = yield all(res.data.results.map(e =>
            (function* () {
                try {
                    return yield call(axios.get, e.url)
                } catch (e) {
                    return e
                }
            })()))
        yield put(setPokemonsAC(pok.filter(el => el).map(el => el.data)))
    } catch (e) {
        console.log(e.message)
    }
}

function* getAllTypesPokemons() {
    try {
        const types = yield call(axios.get, `${url}type/`)
        const typesSet = yield all(types.data.results.map(e =>
            (function* () {
                try {
                    return yield call(axios.get, e.url)
                } catch (e) {
                    return e
                }
            })()))
        yield put(getTypesPokemons(typesSet.map(el => el.data)))
    } catch (e) {
        console.log(e.message)
    }
}

function* getOnePokemonInfo({name}) {
    try {
        const response = yield call(axios.get, `${url}pokemon/${name}`)
        yield put(setOnePokemonAC(response.data))
    } catch (e) {
        console.log(e.message)
    }
}


export default function* pokemonsWatcher() {
    yield all([
        takeLatest(GET_POKEMON, getPokemons),
        takeLatest(GET_ONE_POKEMON, getOnePokemonInfo),
        takeLatest(ADD_ALL_TYPES, getAllTypesPokemons)])
}
