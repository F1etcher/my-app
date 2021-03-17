import React from "react";
import Main from './Pages/Main/Main'
import {Route} from 'react-router-dom'
import Pokemon from "./Pages/Pokemon/Pokemon";
import Navbar from "./component/Navbar";
import {Container, Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import FavoriteCards from "./Pages/Favorite/Favorite";
import CheckboxFilters from "./Pages/Types/TypesFilter";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));


const App = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Navbar/>
            <CheckboxFilters/>
            <Paper variant="outlined">
                <Container maxWidth='xl'>
                    <Route path='/' exact component={Main}/>
                    <Route path='/pokemon/:name' component={Pokemon}/>
                    <Route path='/favorite' component={FavoriteCards}/>
                </Container>
            </Paper>
        </div>
    )
}

export default App;
