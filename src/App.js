import React from "react";
import MainPage from './component/mainPage/mainPage'
import './App.css';
import {Route} from 'react-router-dom'
import PokemonInfo from "./component/mainPage/pokemon/pokemonInfo";
import Navbar from "./component/Navbar";
import Search from "./component/Search/search";



 const App = ()=> {

    return (
        <div>
            <Navbar/>
            <Search/>
            <Route path='/pokemon' render={()=> <PokemonInfo />}/>
            <Route path='/' exact render={()=> <MainPage/>}/>
        </div>
    )
}

export default App;
