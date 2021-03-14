import React from "react";
import Main from './Pages/Main/Main'
import {Route} from 'react-router-dom'
import Pokemon from "./Pages/Pokemon/Pokemon";
import Navbar from "./component/Navbar";
import {Container} from "@material-ui/core";
import SimpleModal from "./test";


 const App = ()=> {

    return (
        <Container maxWidth="xl">
            <Navbar/>
            <Route path='/pokemon' component={Pokemon}/>
            <Route path='/' exact component={Main}/>
        </Container>
    )
}

export default App;
