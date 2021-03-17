// import React from 'react';
// import Modal from "@material-ui/core/Modal";
// import {useDispatch, useSelector} from "react-redux";
// import {setOpen} from "../../redux/reducers/modalReducer";
// import {Avatar, Box, CircularProgress, Container, LinearProgress, makeStyles, Paper} from "@material-ui/core";
// import Typography from "@material-ui/core/Typography";
// import CardContent from "@material-ui/core/CardContent";
// import {withStyles} from "@material-ui/core/styles";
// import Card from "@material-ui/core/Card";
//
// const BorderLinearProgress = withStyles((theme) => ({
//     root: {
//         height: 5,
//         borderRadius: 5,
//     },
//     colorPrimary: {
//         backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
//     },
//     bar: {
//         borderRadius: 5,
//         backgroundColor: '#1a90ff',
//     },
// }))(LinearProgress);
// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1
//     }
// }));
//
// export default function SimpleModal() {
//     const state = useSelector(state => state.favoritePage)
//     const modalState = useSelector(state => state.modalPage)
//     const dispatch = useDispatch()
//     const classes = useStyles()
//     const onClose = () => {
//         dispatch(setOpen(false))
//     }
//     const normalise = value => (value - 0) * 100 / (300 - 0)
//
//
//     const body = state.favoritePokemons? (
//         <Container fixed>
//             <Paper elevation={3}>
//                 {state.favoritePokemons.map((el, index) =>
//                 <Card key={index} className={classes.card}>
//                     <Avatar alt="nope)" variant='circular' src={el.sprites.front_default}
//                             className={classes.large}/>
//                     <Typography
//                         color='primary'
//                         align='center'
//                         variant="h5"
//                         component="h4"
//                         gutterBottom>
//                         {el.name}
//                     </Typography>
//                     <CardContent>
//                         {el.stats.map((el, index) =>
//                             <Box key={index}>
//                                 <Typography align='center' variant="body1" color="textSecondary">
//                                     {el.stat.name.toUpperCase()}
//                                 </Typography>
//                                 <BorderLinearProgress variant="determinate" value={normalise(el.base_stat)}/>
//                                 <Typography>
//                                     {el.base_stat}
//                                 </Typography>
//                             </Box>
//                         )}
//                     </CardContent>
//                 </Card>
//                 )}
//             </Paper>
//         </Container>
//     ) : <CircularProgress/>
//
//
//     return (
//         <Modal
//             disablePortal
//             disableEnforceFocus
//             disableAutoFocus
//             open={modalState.modal}
//             onClose={onClose}
//         >
//             {body}
//         </Modal>
//     );
// }