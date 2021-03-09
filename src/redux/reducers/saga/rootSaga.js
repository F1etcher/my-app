import {all, fork} from "redux-saga/effects";
import pokemonsWatcher from "./mainSaga";


export default function* rootSaga() {
    yield all([
        fork(pokemonsWatcher)
    ])
}