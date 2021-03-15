import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import mainReducer from "./reducers/mainReducer";
import createSagaMiddleware from 'redux-saga'
import rootSaga from "./sagas/mainSaga";
import modalReducer from "./reducers/modalReducer";


const reducers = combineReducers(
    {
        mainPage: mainReducer,
        modalPage: modalReducer
    }
)
const sagaMiddleware = createSagaMiddleware()


const store = createStore(
    reducers,
    compose(applyMiddleware(sagaMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
)

sagaMiddleware.run(rootSaga);

window.store = store

export default store