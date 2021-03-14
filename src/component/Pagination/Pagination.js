import React from "react";
import {
    getPokemonsAC,
    setCurrentPageAC,
    setPageSize,
} from "../../redux/reducers/mainReducer";
import {useDispatch} from "react-redux";
import {Pagination as Pag} from "@material-ui/lab";
import {FormControl, Grid, InputLabel, Select} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    pagin: {
        padding: 10
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

function Pagination({state}) {
    const dispatch = useDispatch()
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
    }
    let arrOptions = [
        {value: 5},
        {value: 10},
        {value: 20},
        {value: 50}
    ]
    let pageCount = Math.ceil(state.totalCount / state.pageSize)
    const classes = useStyles();

    return (
        <Grid container direction="row" justify="center" alignItems="center">
            <Pag className={classes.pagin}
                 count={pageCount}
                 variant="outlined"
                 shape="rounded"
                 color="primary"
                 page={+state.currentPage}
                 onChange={onChangePage}
            />
            <Grid>
                <FormControl variant="standard" className={classes.formControl}>
                    <InputLabel htmlFor="Page-Size">Page Size</InputLabel>
                    <Select
                        native
                        value={state.pageSize}
                        onChange={onChangePageSize}
                    >
                        {arrOptions.map(el => <option key={el.value} value={el.value}>{el.value}</option>)}
                    </Select>
                </FormControl>
                {/*<select onChange={onChangePageSize} value={state.pageSize}>*/}
                {/*    {arrOptions.map(el => <option key={el.value} value={el.value}>{el.value}</option>)}*/}
                {/*</select>*/}
            </Grid>
        </Grid>
    )
}

export default Pagination;