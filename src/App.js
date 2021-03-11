import React from "react";
import MainPage from './component/mainPage/mainPage'
import './App.css';
import {Route} from 'react-router-dom'
import PokemonInfo from "./component/mainPage/pokemon/pokemonInfo";
import Navbar from "./component/Navbar";
import Search from "./component/Search/search";
import {Container} from "@material-ui/core";



 const App = ()=> {

    return (
        <Container maxWidth="xl">
            <Navbar/>
            <Search/>
            <Route path='/pokemon' component={PokemonInfo}/>
            <Route path='/' exact component={MainPage}/>
        </Container>
    )
}

export default App;
