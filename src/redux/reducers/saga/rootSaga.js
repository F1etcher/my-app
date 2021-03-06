import {all} from "redux-saga/effects";
import pokemonsWatcher from "./mainSaga";


export default function* rootSaga() {
    yield all([
        pokemonsWatcher()
    ])
}