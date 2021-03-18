import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {Avatar, Box, Grid, LinearProgress, Paper} from "@material-ui/core";
import {useSelector} from "react-redux";
import CardContent from "@material-ui/core/CardContent";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    large: {
        width: theme.spacing(18),
        height: theme.spacing(18),
        margin: 'auto'
    },
}));


function FavoriteCards() {
    const stateFavorite = useSelector(state => state.favoritePage)
    const classes = useStyles()

    if (stateFavorite.favoritePokemons) {
        return (
            <Grid container spacing={2}>
                {stateFavorite.favoritePokemons.map((el, index) =>
                    <Grid key={el.id} item xs={12} sm={6} md={3}>
                        <Paper elevation={2}>
                            <Avatar alt="nope)" variant='circular'
                                    src={el.sprites.front_default}
                                    className={classes.large}/>
                            <Typography
                                color='primary'
                                align='center'
                                variant="h5"
                                component="h4"
                                gutterBottom>
                                {el.name}
                            </Typography>
                            <CardContent>
                                {el.types.map((el, index) =>
                                    <Box key={index}>
                                        <Typography align='center' variant="body1" color="textSecondary">
                                            {el.type.name.toUpperCase()}
                                        </Typography>
                                    </Box>
                                )}
                            </CardContent>
                        </Paper>
                    </Grid>
                )}
            </Grid>
        );
    }
    return <LinearProgress/>
}

export default FavoriteCards;