import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {Avatar, Grid, LinearProgress, Link} from "@material-ui/core";
import Modal from "@material-ui/core/Modal";


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

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}


function MediaCard(pokemon) {
    const classes = useStyles()
    const normalise = value => (value - 0) * 100 / (300 - 0)


    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <Link href={`/pokemon/?=${pokemon.pokemonData.name}`}>
                <Avatar alt="nope)" variant='circular' src={pokemon.pokemonData.sprites.front_default}
                        className={classes.large}/>
            </Link>
            <Typography
                className={classes.name}
                variant="h5"
                component="h2">
                {pokemon.pokemonData.name}
            </Typography>
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
        </div>
    );


    if (pokemon) {
        return (
            <Card onClick={handleOpen} className={classes.root}>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    {body}
                </Modal>
                <CardActionArea className={classes.name}>
                    <Grid className={classes.card} item xs={12}>
                        <Avatar alt="nope)" variant='circular' src={pokemon.pokemonData.sprites.front_default}
                                className={classes.large}/>
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
            </Card>
        );
    }
    return null

}

export default MediaCard;