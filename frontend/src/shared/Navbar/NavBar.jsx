import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },

    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        height: 65,
        marginLeft: theme.template.sideDrawerClosedWidth,
        width: `calc(100% - ${theme.template.sideDrawerClosedWidth}px)`,
        backgroundColor: "#464646",

    },

    appBarShift: {
        marginLeft: theme.template.sideDrawerOpenWidth,
        width: `calc(100% - ${theme.template.sideDrawerOpenWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },

    userName: {
        color: "#c1c1c1",
        marginRight: theme.spacing(2)
    },

    menuButton: {
        marginRight: 36,
    },

}));

const Navbar = (props) => {
    const classes = useStyles(props);
    const {expanded, handleToggleOpen, userName, urlLink, pageName, handleLogout} = props;
    return (
        <AppBar
            position="absolute"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: expanded,
            })}
        >
            <Toolbar classes={{root: classes.appBarRoot}}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleToggleOpen}
                    edge="start"
                    className={clsx(classes.menuButton)}
                    style={{color: "rgb(255, 255, 255, 0.7)"}}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
                    {pageName}
                </Typography>
                <div className={classes.grow} />
                <Typography variant="body2" noWrap className={classes.userName}>
                    {userName}
                </Typography>

                <Avatar
                    src={urlLink}
                />

                <IconButton
                    style={{padding: 10, color: "rgb(255, 255, 255, 0.7)"}}
                    onClick={handleLogout}
                >
                    <ExitToAppIcon
                        style={{color: 'white', fontSize: 35}}
                    />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
};


export default Navbar