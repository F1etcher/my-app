import React from 'react';
import Modal from "@material-ui/core/Modal";
import {useDispatch, useSelector} from "react-redux";
import {setOpen} from "../../redux/reducers/modalReducer";
import {Avatar, Box, Grid, LinearProgress, makeStyles, Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import {withStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";


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
            <Paper elevation={3}>
                <Card className={classes.card}>
                    <Avatar alt="nope)" variant='circular' src={state.pageModal.sprites.front_default}
                            className={classes.large}/>
                    <Typography
                        color='primary'
                        align='center'
                        variant="h5"
                        component="h4"
                        gutterBottom>
                        {state.pageModal.name}
                    </Typography>
                    <CardContent>
                        {state.pageModal.stats.map((el, index) =>
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
                </Card>
            </Paper>
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