import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Search from "../Search/Search";
import StarIcon from '@material-ui/icons/Star';
import {Badge, Box} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    search: {
        display: 'inline-flex'
    },

}));


export default function Navbar() {
    const state = useSelector(state => state.favoritePage)
    const classes = useStyles();
    const dispatch = useDispatch()
    // const onOpen = () => {
    //     dispatch(setOpen(true))
    // }
    return (
        <AppBar position='sticky'>
            <Toolbar>
                    <Typography variant="h6" className={classes.title}><Link style={{ textDecoration: 'none', color: '#ffffff' }} to="/">Pokemon</Link></Typography>
                <Box mr={2} className={classes.search}>
                    <Link to="/favorite">
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="open drawer"
                        >
                            <Badge badgeContent={state.favoritePokemons.length} color="primary">
                                <StarIcon/>
                            </Badge>
                        </IconButton>
                    </Link>
                    <Search/>
                </Box>
            </Toolbar>
        </AppBar>
    );
}