import React, {useEffect, useRef} from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {useDispatch, useSelector} from "react-redux";
import {changeSuitable, changeTypesState, getTypesPokemons} from "../../redux/reducers/typesReducer";
import deep from 'deep-equal'
import {getPokemonsAC} from "../../redux/reducers/mainReducer";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import {makeStyles} from "@material-ui/core/styles";
import {Typography} from "@material-ui/core";

const useStyles = makeStyles({
    heading: {
        margin: 'auto'
    },
});

export default function CheckboxFilters() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const types = useSelector(types => types.typesPage)
    const size = useSelector(types => types.mainPage.pageSize)

    useEffect(() => {
        dispatch(getTypesPokemons())
    }, [dispatch])
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
        dispatch(getPokemonsAC(size, 0))
    }, [dispatch, size, types.types, types.typesState])

    const handleChange = (event) => {
        dispatch(changeTypesState({...types.typesState, [event.target.name]: event.target.checked}))
    };
    if (!Object.keys(types.typesState).length) return null
    return (
        <Accordion>
            <AccordionSummary
                className={classes.name}
                expandIcon={<ExpandMoreIcon/>}

            >
                <Typography
                    color='primary'
                    variant="h5"
                    component="h4"
                    className={classes.heading}
                    >
                    Filter Types
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <FormGroup row className={classes.heading}>
                    {types.types.map((el) =>
                        <FormControlLabel key={el.id}
                                          control={
                                              <Checkbox
                                                  checked={types.typesState[el.name]}
                                                  onChange={handleChange}
                                                  name={el.name}
                                                  color="primary"
                                              />
                                          }
                                          labelPlacement='top'
                                          label={el.name}
                        />
                    )}
                </FormGroup>
            </AccordionDetails>
        </Accordion>
    );
}