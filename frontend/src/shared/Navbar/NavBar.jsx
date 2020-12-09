import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import React, {useContext, useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu'
import Alert from "@material-ui/lab/Alert";
import Collapse from '@material-ui/core/Collapse';
import {NotificationContext} from "../../context/NotificationContext";
import {ERROR, SUCCESSFUL} from "../../constants/NOTIFICATION_TYPES";

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
        backgroundColor: "#4A5256",

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

const getSeverity = (notification) => {
    switch (notification.type){
        case SUCCESSFUL:
            return 'success'
        case ERROR:
            return 'error'
        default:
            return 'success'
    }
}

const Navbar = (props) => {
    const classes = useStyles(props);
    const { notification, clearNotification } = useContext(NotificationContext)
    const {expanded, handleToggleOpen, userName, urlLink, pageName, handleLogout} = props;

    useEffect(() => {
        if(!!notification){
            const timer = setTimeout(() => {
                clearNotification();
                }, 8000
            );
            return () => clearTimeout(timer);
        }
    }, [notification]);

    return (
        <AppBar
            position="fixed"
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
            {!!notification ? (
                <Collapse in={!!notification}>
                    <Alert severity={getSeverity(notification)}>
                        {notification.message}
                    </Alert>
                </Collapse>
            ):null }
        </AppBar>
    )
};


export default Navbar