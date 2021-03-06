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
            const Allpok = yield call(axios.get, `${url}pokemon?limit=100&offset=0`)
            yield put(setToSearch(Allpok.data.results))
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
    yield takeLatest(GET_POKEMON, getPokemons)
    yield takeLatest(GET_ONE_POKEMON, getOnePokemonInfo)
}
