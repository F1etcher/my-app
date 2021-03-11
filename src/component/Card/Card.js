import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Grid, LinearProgress, Link} from "@material-ui/core";
import {useHistory} from "react-router";

const useStyles = makeStyles({
    root: {},
    media: {
        height: 110,
        width: 110,
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'spaceBetween',
    },
    titleInfo: {}
});
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
    // let history = useHistory();
    // const handleCardClick = () =>{
    //     history.push(`/pokemon/?=${pokemon.pokemonData.name}`);
    // }
    const classes = useStyles();
    const normalise = value => (value - 0) * 100 / (300 - 0);
    return (
        <Card className={classes.root}>
            <CardActionArea>
                <Grid className={classes.card} item xs={12}>
                    <Link href={`/pokemon/?=${pokemon.pokemonData.name}`}>
                        <CardMedia
                            className={classes.media}
                            component="img"
                            alt="Contemplative Reptile"
                            image={pokemon.pokemonData.sprites.front_default}
                        />
                    </Link>
                    <Typography
                        className={classes.name}
                        variant="h5"
                        component="h2">
                        {pokemon.pokemonData.name}
                    </Typography>
                </Grid>
                <CardContent className={classes.titleInfo}>
                    {pokemon.pokemonData.stats.map(el =>
                        <Typography variant="body2" color="textSecondary">
                            {el.stat.name}
                            <BorderLinearProgress variant="determinate" value={normalise(el.base_stat)}/>
                            {el.base_stat}
                        </Typography>
                    )}
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="inherit">
                    Share
                </Button>
            </CardActions>
        </Card>
    );
}

export default MediaCard;