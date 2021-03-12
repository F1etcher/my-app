import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Avatar, Grid, LinearProgress, Link} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
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
    large: {
        width: theme.spacing(18),
        height: theme.spacing(18),
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

    const classes = useStyles();
    const normalise = value => (value - 0) * 100 / (300 - 0);

    if (pokemon) {
        return (
            <Card className={classes.root}>
                <CardActionArea>
                    <Grid className={classes.card} item xs={12}>
                        <Link href={`/pokemon/?=${pokemon.pokemonData.name}`}>
                            <Avatar alt="nope)" variant='circular' src={pokemon.pokemonData.sprites.front_default} className={classes.large} />
                        </Link>
                        <Typography
                            className={classes.name}
                            variant="h5"
                            component="h2">
                            {pokemon.pokemonData.name}
                        </Typography>
                    </Grid>
                    <CardContent className={classes.titleInfo}>
                        {pokemon.pokemonData.stats.map((el, index) =>
                            <Grid key={index}>
                                <Typography variant="body2" color="textSecondary">
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
                <CardActions>
                    <Button size="small" color="inherit">
                        Share
                    </Button>
                </CardActions>
            </Card>
        );
    }
    return null

}

export default MediaCard;