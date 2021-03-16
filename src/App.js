import React from "react";
import Main from './Pages/Main/Main'
import {Route} from 'react-router-dom'
import Pokemon from "./Pages/Pokemon/Pokemon";
import Navbar from "./component/Navbar";
import {Container, Paper} from "@material-ui/core";
import SimpleModal from "./component/Modal/Modal";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    cardGrid: {}
}));


const App = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Paper variant="outlined">
                <Navbar/>
                <SimpleModal/>
                <Container className={classes.cardGrid} maxWidth='xl'>
                        <Route path='/' exact component={Main}/>
                        <Route path='/pokemon' component={Pokemon}/>
                </Container>
            </Paper>
        </div>
    )
}

export default App;
