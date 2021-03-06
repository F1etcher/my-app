import React, {useEffect} from "react";
import Card from '../Card/Card'
import './mainPage.css';
import Navbar from "../Navbar/Navbar";
import {NavLink} from "react-router-dom";
import {
    getPokemonsAC,
    setCurrentPageAC,
    setPageSize,
    setValueToSearch,
} from "../../redux/reducers/mainReducer";
import {useDispatch, useSelector} from "react-redux";
import {Pagination} from "@material-ui/lab";
import AnimatedMulti from "./pokemon/search";


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

    let setValue = (event) => {
        let value = event.target.value
        dispatch(setValueToSearch(value))

    }
    let search = () => {
        let value = state.valueForSearch

    }

    return (
        <div>
            {!state.pokemon.length ? (
                <h1>Loading...</h1>
            ) : (
                <>
                    <Navbar/>
                    <AnimatedMulti/>

                    <div className='btn'>
                        <Pagination count={pageCount} variant="outlined" shape="rounded" page={+state.currentPage}
                                    onChange={onChangePage}/>
                        <select onChange={onChangePageSize} value={state.pageSize}>
                            {arrOptions.map(el => <option key={el.value} value={el.value}>{el.value}</option>)}
                        </select>
                    </div>
                    <div className='grid-container'>
                        {state.pokemon.filter(el => el !== undefined || null).map((pokemon, i) =>
                            <NavLink to={'/pokemon?=' + pokemon.name} key={i}
                                     style={{textDecoration: 'none', color: 'black'}}>
                                <Card key={i} pokemonData={pokemon}/>
                            </NavLink>
                        )}
                    </div>
                </>
            )
            }
        </div>);
}

export default MainPage;
