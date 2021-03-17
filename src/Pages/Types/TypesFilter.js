import React, {useEffect, useRef} from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {useDispatch, useSelector} from "react-redux";
import {changeSuitable, changeTypesState, getTypesPokemons} from "../../redux/reducers/typesReducer";
import deep from 'deep-equal'
import {getPokemonsAC} from "../../redux/reducers/mainReducer";

export default function CheckboxFilters() {
    const dispatch = useDispatch()
    const types = useSelector(types => types.typesPage)
    const size = useSelector(types => types.mainPage.pageSize)

    useEffect(() => {
        dispatch(getTypesPokemons())
    }, [])

    const typesStateRef = useRef(types.typesState)
    if (!deep(typesStateRef.current, types.typesState)) {
        typesStateRef.current = types.typesState
    }
    useEffect(() => {
            const checkedTypes = Object.entries(types.typesState).filter(el => el[1]).map((el) => el[0])
            const pokemonsUrl = types.types.filter((el) => checkedTypes.includes(el.name)).map((el) => el.pokemon.map(pok => pok.pokemon.url)).reduce((prev, cur) => {
                return [...prev, ...cur]
            }, [])
            dispatch(changeSuitable(pokemonsUrl))
        dispatch(getPokemonsAC(size,0))
    }, [typesStateRef.current])

    const handleChange = (event) => {
        dispatch(changeTypesState({...types.typesState, [event.target.name]: event.target.checked}))
    };
    if (!Object.keys(types.typesState).length) return null
    return (
        <FormGroup row>
            {types.types.map((el) =>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={types.typesState[el.name]}
                            onChange={handleChange}
                            name={el.name}
                            color="primary"
                        />
                    }
                    label={el.name}
                />
            )}
        </FormGroup>
    );
}