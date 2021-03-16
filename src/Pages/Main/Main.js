import React, {useEffect} from "react";
import MediaCard from '../../component/Card/MediaCard'
import {Grid, LinearProgress} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {getPokemonsAC} from "../../redux/reducers/mainReducer";
import Pagination from "../../component/Pagination/Pagination";


function Main() {
    const state = useSelector(state => state.mainPage)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPokemonsAC(state.pageSize, 0))
    }, [dispatch, state.pageSize]);

    return (
        <>
            {!state.pokemon.length ? (
                <LinearProgress />
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
