import React, {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux";
import {getOnePokemonAC} from "../../redux/reducers/mainReducer";
import {useLocation} from "react-router";
import CardActionArea from "@material-ui/core/CardActionArea";
import {Avatar, CircularProgress, Grid, LinearProgress} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import {makeStyles, withStyles} from "@material-ui/core/styles";


const useStyles = makeStyles({
    root: {
        margin: 'auto',
        width: 500,

    },
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

const Pokemon = () => {
    const dispatch = useDispatch()
    const res = useSelector(state => state.mainPage.one_pokemon)
    let location = useLocation();
    useEffect(() => {
        let queryId = document.location.search.split('=')
        dispatch(getOnePokemonAC(queryId[1]))
    }, [location, dispatch]);

    const classes = useStyles();
    const normalise = value => (value - 0) * 100 / (300 - 0);

    return (
        <>
            {!res ?
                <CircularProgress />
                :
                <Card className={classes.root}>
                    <CardActionArea>
                        <Grid className={classes.card} item xs={12}>
                            <Avatar alt="nope)" variant='circular' src={res.sprites.front_default}
                                    className={classes.large}/>
                            <Typography
                                className={classes.name}
                                variant="h5"
                                component="h2">
                                {res.name}
                            </Typography>
                        </Grid>
                        <CardContent className={classes.titleInfo}>
                            {res.stats.map((el,index) =>
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
                </Card>
            }
        </>
    )
}


export default Pokemon
