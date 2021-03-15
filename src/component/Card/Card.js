import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {Avatar, Grid, LinearProgress} from "@material-ui/core";
import {setOpen, setPage} from "../../redux/reducers/modalReducer";
import {useDispatch} from "react-redux";


const useStyles = makeStyles((theme) => ({
    root: {},
    media: {
        height: 110,
        width: 110,
    },
    card: {},
    name: {
        textAline: 'center'
    },
    large: {
        width: theme.spacing(18),
        height: theme.spacing(18),
        margin: 'auto'
    },
    paper: {
        position: 'absolute',
        width: 280,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    titleInfo: {}
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
    const onOpen = () =>{
        dispatch(setOpen(true))
        dispatch(setPage(pokemon.pokemonData))
    }

    if (pokemon) {
        return (
            <Card onClick={onOpen} className={classes.root}>
                <CardActionArea className={classes.name}>
                    <Grid className={classes.card} item xs={12}>
                        <Avatar alt="nope)" variant='circular' src={pokemon.pokemonData.sprites.front_default}
                                className={classes.large}/>
                        <Typography
                            align='center'
                            className={classes.name}
                            variant="h5"
                            component="h2">
                            {pokemon.pokemonData.name}
                        </Typography>
                    </Grid>
                    <CardContent className={classes.titleInfo}>
                        {pokemon.pokemonData.stats.map((el, index) =>
                            <Grid key={index}>
                                <Typography align='center' variant="body2" color="textSecondary">
                                    {el.stat.name.toUpperCase()}
                                </Typography>
                                <BorderLinearProgress variant="determinate" value={normalise(el.base_stat)}/>
                                <Typography>
                                    {el.base_stat}
                                </Typography>
                            </Grid>
                        )}
                    </CardContent>
                </CardActionArea>
            </Card>
        );
    }
    return null

}

export default MediaCard;