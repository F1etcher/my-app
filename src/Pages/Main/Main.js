import React, {useEffect} from "react";
import MediaCard from '../../component/Card/MediaCard'
import {Grid, LinearProgress} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {getPokemonsAC} from "../../redux/reducers/mainReducer";
import Pagination from "../../component/Pagination/Pagination";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    card: {
        display: 'flex',
        justifyContent: 'center',
    },
});

function Main() {
    const state = useSelector(state => state.mainPage)
    const dispatch = useDispatch()

    useEffect(() =>{
        const offset = state.pageSize * state.currentPage - state.pageSize
        dispatch(getPokemonsAC(state.pageSize, offset))
    }, [dispatch, state.pageSize,state.currentPage ]);
    const classes = useStyles();
    return (
        <>
            {!state.pokemon.length || state.loading ? (
                <LinearProgress  className={classes.card}/>
            ) : (
                    <Grid container spacing={2}>
                        <Pagination state={state}/>
                        {state.pokemon.map((pokemon, i) =>
                            <Grid key={i} item xs={12} sm={6} md={3}>
                                <MediaCard pokemonData={pokemon}/>
                            </Grid>
                        )}
                    </Grid>
            )
            }
        </>
    );
}

export default Main;
