import React, {useEffect} from "react";
import MediaCard from '../../component/Card/Card'
import {CircularProgress, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {getPokemonsAC} from "../../redux/reducers/mainReducer";
import Pagination from "../../component/Pagination/Pagination";



function Main() {
    const state = useSelector(state => state.mainPage)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPokemonsAC(state.pageSize, 0))
    }, [dispatch, state.pageSize]);
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        Pagin:  {
            display: 'flex',
            justifyContent: 'center'
        }
    }))
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {!state.pokemon.length ? (
                <CircularProgress />
            ) : (
                <>
                    <Grid container spacing={1}>
                        <Grid className={classes.Pagin} item xs={12}>
                            <Pagination state={state}/>
                        </Grid>
                        <Grid container spacing={1}>
                            {state.pokemon.map((pokemon, i) =>
                                <Grid key={i} item xs={2}>
                                    <MediaCard pokemonData={pokemon}/>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>

                </>
            )
            }
        </div>);
}

export default Main;
