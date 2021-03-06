import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {Avatar, Box, LinearProgress, Paper} from "@material-ui/core";
import {useDispatch} from "react-redux";
import StarIcon from '@material-ui/icons/Star';
import IconButton from "@material-ui/core/IconButton";
import {addFavoritePokemon} from "../../redux/reducers/favoriteReducer";
import {useHistory} from "react-router";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    large: {
        width: theme.spacing(18),
        height: theme.spacing(18),
        margin: 'auto'
    },
    favorite: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: 10
    },
    card: {
        minWidth: 320,
        overflow: 'visible',
        transition: '0.2s',
        '&:hover': {
            transform: 'translateY(-20px)'
        },
        '&:before': {
            content: '""',
            zIndex: 0,
            display: 'block',
            width: '100%',
            bottom: -1,
            height: '100%',
        },
    },
}));
const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 5,
        borderRadius: 5,
    },
    colorPrimary: {
        backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
        borderRadius: 5,
        backgroundColor: '#1a90ff',
    },
}))(LinearProgress);

function MediaCard(pokemon) {
    const dispatch = useDispatch()
    const classes = useStyles()
    const normalise = value => (value - 0) * 100 / (300 - 0)
    const addToFavorite = () => {
        dispatch(addFavoritePokemon(pokemon.pokemonData))
    }
    let history = useHistory()
    function handleClick() {
        history.push(`/pokemon/${pokemon.pokemonData.name}`);
    }
    if (pokemon.pokemonData) {
        return (
            <Paper elevation={5} className={classes.card}>
                <Box className={classes.favorite}>
                    <IconButton onClick={addToFavorite} aria-label="delete">
                        <StarIcon/>
                    </IconButton>
                </Box>
                    <Avatar onClick={handleClick} alt="nope)" variant='circular' src={pokemon.pokemonData.sprites.front_default}
                            className={classes.large}/>
                <Typography
                    color='primary'
                    align='center'
                    variant="h5"
                    component="h4"
                    gutterBottom>
                    {pokemon.pokemonData.name}
                </Typography>
                <CardContent>
                    {pokemon.pokemonData.stats.map((el, index) =>
                        <Box key={index}>
                            <Typography align='center' variant="body1" color="textSecondary">
                                {el.stat.name.toUpperCase()}
                            </Typography>
                            <BorderLinearProgress variant="determinate" value={normalise(el.base_stat)}/>
                            <Typography>
                                {el.base_stat}
                            </Typography>
                        </Box>
                    )}
                </CardContent>
            </Paper>
        );
    }
    return <LinearProgress/>
}

export default MediaCard;