import {put, takeLatest, all, call, select} from 'redux-saga/effects'
import {
    GET_ONE_POKEMON,
    GET_POKEMON,
    setOnePokemonAC,
    setPokemonsAC,
    setToSearch,
    setTotalCount
} from "../mainReducer";
import axios from "axios";

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
            localStorage.setItem('SearchPokemon',JSON.stringify(SearchPokemon))
        }
        const pok = yield all(res.data.results.map(e => call(axios.get, e.url)))
        yield put(setPokemonsAC(pok.map(el => el.data)))
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
        takeLatest(GET_ONE_POKEMON, getOnePokemonInfo)])
}
