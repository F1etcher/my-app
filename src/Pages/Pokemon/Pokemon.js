import React, {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux";
import {getOnePokemonAC} from "../../redux/reducers/mainReducer";
import {useParams} from "react-router";
import {Avatar, Box,LinearProgress} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import {makeStyles, withStyles} from "@material-ui/core/styles";


const useStyles = makeStyles({

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
    const { name } = useParams();
    useEffect(() => {
        dispatch(getOnePokemonAC(name))
    }, [ dispatch]);
    const classes = useStyles();
    const normalise = value => (value - 0) * 100 / (300 - 0);
    return (
        <>
            {!res ?
                <LinearProgress />
                :
                <Card className={classes.card}>
                    <Avatar alt="nope)" variant='circular' src={res.sprites.front_default}
                            className={classes.large}/>
                    <Typography
                        align='center'
                        className={classes.name}
                        variant="h5"
                        component="h3">
                        {res.name}
                    </Typography>
                    <CardContent>
                        {res.stats.map((el, index) =>
                            <Box key={index}>
                                <Typography variant="body2" color="textSecondary">
                                    {el.stat.name.toUpperCase()}
                                </Typography>
                                <BorderLinearProgress variant="determinate" value={normalise(el.base_stat)}/>
                                <Typography>
                                    {el.base_stat}
                                </Typography>
                            </Box>
                        )}
                    </CardContent>
                </Card>
            }
        </>
    )
};


export default Pokemon
