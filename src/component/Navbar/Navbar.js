import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Search from "../Search/Search";
import StarIcon from '@material-ui/icons/Star';
import {Badge} from "@material-ui/core";
import {useSelector} from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        width: '35%',
    },
}));

export default function Navbar() {
    const state = useSelector(state => state.modalPage)
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <Badge badgeContent={11} color="secondary">
                            <StarIcon/>
                        </Badge>
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Pokemon
                    </Typography>
                    <div className={classes.search}>
                        <Search/>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}