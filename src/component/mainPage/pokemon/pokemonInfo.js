import React, {useEffect} from "react"
import pokemonTypes from '../../../helpers/pokemonTypes'
import {useDispatch, useSelector} from "react-redux";
import {getOnePokemonAC} from "../../../redux/reducers/mainReducer";
import {useLocation} from "react-router";
import CardActionArea from "@material-ui/core/CardActionArea";
import {Grid, LinearProgress} from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import {makeStyles, withStyles} from "@material-ui/core/styles";


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

const PokemonInfo = () => {
    const dispatch = useDispatch()
    const res = useSelector(state => state.mainPage.one_pokemon )
    console.log(res)
    let location = useLocation();
    useEffect(() => {
        let queryId = document.location.search.split('=')
        dispatch(getOnePokemonAC(queryId[1]))
    }, [location]);
    const classes = useStyles();
    const normalise = value => (value - 0) * 100 / (300 - 0);

    return (
        <>
            {!res ?
                <div>Loading</div>
                :
                <Card className={classes.root}>
                    <CardActionArea>
                        <Grid className={classes.card} item xs={12}>
                            <CardMedia
                                className={classes.media}
                                component="img"
                                alt="Contemplative Reptile"
                                image={res.sprites.front_default || null}
                            />
                            <Typography
                                className={classes.name}
                                variant="h5"
                                component="h2">
                                {res.name}
                            </Typography>
                        </Grid>
                        <CardContent className={classes.titleInfo}>
                            {res.stats.map(el =>
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
            }
        </>
    )
}


export default PokemonInfo
