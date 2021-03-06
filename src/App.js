import React from "react";
import MainPage from './component/mainPage/mainPage'
import './App.css';
import {Route} from 'react-router-dom'
import PokemonInfo from "./component/mainPage/pokemon/pokemonInfo";



 const App = ()=> {

    return (
        <div>
            <Route path='/pokemon' render={()=> <PokemonInfo />}/>
            <Route path='/' exact render={()=> <MainPage/>}/>
        </div>
    )
}

export default App;
