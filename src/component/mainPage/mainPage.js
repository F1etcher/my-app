import React, {useEffect} from "react";
import MediaCard from '../Card/Card'
import {
    getPokemonsAC,
    setCurrentPageAC,
    setPageSize,
} from "../../redux/reducers/mainReducer";
import {useDispatch, useSelector} from "react-redux";
import {Pagination} from "@material-ui/lab";
import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";


function MainPage() {
    const state = useSelector(state => state.mainPage)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPokemonsAC(state.pageSize, 0))
    }, []);

    const onChangePage = (e, value) => {
        let offset = state.pageSize * value - state.pageSize
        dispatch(setCurrentPageAC(value))
        dispatch(getPokemonsAC(state.pageSize, offset))
    }

    const onChangePageSize = (e) => {
        let limit = e.target.value
        let offset = 0
        dispatch(setPageSize(limit))
        dispatch(getPokemonsAC(limit, offset))
        console.log(limit)
    }
    let arrOptions = [
        {value: 5},
        {value: 10},
        {value: 20},
        {value: 50}
    ]
    let pageCount = Math.ceil(state.totalCount / state.pageSize)

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }));
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {!state.pokemon.length ? (
                <h1>Loading...</h1>
            ) : (
                <>
                    <div>
                        <Pagination count={pageCount} variant="outlined" shape="rounded" page={+state.currentPage}
                                    onChange={onChangePage}/>
                        <select onChange={onChangePageSize} value={state.pageSize}>
                            {arrOptions.map(el => <option key={el.value} value={el.value}>{el.value}</option>)}
                        </select>
                    </div>
                    <Grid container spacing={2}>
                        {state.pokemon.filter(el => el !== undefined || null).map((pokemon, i) =>
                            <Grid item xs={2}>
                                <MediaCard key={i} pokemonData={pokemon}/>
                            </Grid>
                        )}
                    </Grid>
                </>
            )
            }
        </div>);
}

export default MainPage;
