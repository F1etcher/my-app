import React from 'react';
import Modal from "@material-ui/core/Modal";
import {useDispatch, useSelector} from "react-redux";
import {setOpen} from "../../redux/reducers/modalReducer";
import {Avatar, Grid, LinearProgress, makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import {withStyles} from "@material-ui/core/styles";


function rand() {
    return Math.round(Math.random() * 20) - 10;
}
function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}
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
const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function SimpleModal() {
    const state = useSelector(state => state.modalPage)
    const dispatch = useDispatch()
    const classes = useStyles()
    const [modalStyle] = React.useState(getModalStyle);
    const onClose = () => {
        dispatch(setOpen(false))
    }
    const normalise = value => (value - 0) * 100 / (300 - 0)
    console.log(state)

    const body = state.pageModal? (
        <div style={modalStyle} className={classes.paper}>
                <Grid className={classes.card} item xs={12}>
                    <Avatar alt="nope)" variant='circular' src={state.pageModal.sprites.front_default}
                            className={classes.large}/>
                    <Typography
                        align='center'
                        className={classes.name}
                        variant="h5"
                        component="h2">
                        {state.pageModal.name}
                    </Typography>
                </Grid>
                <CardContent className={classes.titleInfo}>
                    {state.pageModal.stats.map((el, index) =>
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
        </div>
    ) : null


    return (
        <Modal
            open={state.modal}
            onClose={onClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            {body}
        </Modal>
    );
}