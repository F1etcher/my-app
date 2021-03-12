import React from "react";
import {
    getPokemonsAC,
    setCurrentPageAC,
    setPageSize,
} from "../../redux/reducers/mainReducer";
import {useDispatch} from "react-redux";
import {Pagination as Pag} from "@material-ui/lab";
import {Grid} from "@material-ui/core";

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

    return (
        <Grid>
            <Pag count={pageCount} variant="outlined"
                 color="primary"
                 page={+state.currentPage}
                 onChange={onChangePage}/>
            <Grid>
                <select onChange={onChangePageSize} value={state.pageSize}>
                    {arrOptions.map(el => <option key={el.value} value={el.value}>{el.value}</option>)}
                </select>
            </Grid>
        </Grid>
    )
}

export default Pagination;