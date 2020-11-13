import React from "react";
import clsx from "clsx";
import LogoBackground from "../../assests/images/CDSLogo.png";
import { withRouter } from "react-router-dom";

import {makeStyles} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles((theme) => ({

    drawer: {
        width: theme.template.sideDrawerOpenWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },

    sideDrawerPaper: {
        backgroundColor: "#232E33",
        borderColor: "#000000"
    },

    drawerIconRoot: {
        overflow: "visible"
    },

    drawerOpen: {
        width: theme.template.sideDrawerOpenWidth,
        transition: theme.transitions.create(['width', 'height'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
    },

    drawerClose: {
        transition: theme.transitions.create(['width', 'height'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.template.sideDrawerClosedWidth,
        [theme.breakpoints.up('sm')]: {
            width: theme.template.sideDrawerClosedWidth,
        },
        '& .MuiButtonBase-root':{
            maxHeight: 48
        }
    },

    logoHolder: {
        position: 'relative',
        textAlign: "center",
        color: "#aaaaaa",
        padding: "0.5rem 0.5rem",
        '& img': {
            bottom: 5,
            right: 5,
            height: 65,
            position: 'absolute'
        },
    },

    logoName: {
        textAlign: 'left',
        fontWeight: "lighter",
        fontSize: 25,
        letterSpacing: 0.1,
        '& p': {
            margin: 2,
        }
    },

    logoHolderOpen: {

    },

    logoHolderClose: {
        '& span': {
            display: 'none',
        },
        '& img': {
            paddingTop: 5,
            height: 52,
            position: 'relative'
        },
    },

    listItemSelected: {
        borderLeftColor: theme.palette.primary.main,
        backgroundColor: '#5DB285',
        "&:hover": {
            backgroundColor: "#BFDCCD",
        },
        "&:focus":{
            backgroundColor: "#BFDCCD",
        }
    },

    listItemRoot: {
        backgroundColor: "inheret",
        "&:hover": {
            backgroundColor: "#BFDCCD",
        },
        "&:focus":{
            backgroundColor: "#5db285",
        }
    },
}));

const SideDrawer = (props) => {
    const classes = useStyles(props);
    const {open, history, location, links} = props;

    return (
        <Drawer
            variant="permanent"
            className={clsx( {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
            })}
            classes={{
                paper: clsx({
                    [classes.sideDrawerPaper]: true,
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                }),
            }}
        >
            <div className={clsx({
                    [classes.logoHolder]: true,
                    [classes.logoHolderOpen]: open,
                    [classes.logoHolderClose]: !open,
                })}
            >

                <img src={LogoBackground} alt="CDS Logo"/>
                <span className={classes.logoName} >
                    <p>Commercial</p>
                    <p>Distribution</p>
                    <p>Solutions</p>
                </span>
            </div>
            <hr style={{width: '100%'}} />
            <List style={{padding: "0 5px"}}>
                {links.map((link, index) => (
                    <ListItem
                        button
                        key={index}
                        classes={{root: clsx({
                            [classes.listItemSelected]: link.to === location.pathname,
                            [classes.listItemRoot]: !(link.to === location.pathname)
                        })}}
                        onClick={() => {
                            history.push(link.to)
                        }}
                        style={{borderRadius: 30, margin: "5px 0px"}}
                    >
                        <ListItemIcon
                            className={link.icon} classes={{root: classes.drawerIconRoot}} style={{color: "#aaaaaa" }}
                        >
                            {link.icon}
                        </ListItemIcon>
                        <ListItemText style={{color: "#aaaaaa"}}><Typography style={{fontSize: '1.1rem'}}>{link.text}</Typography></ListItemText>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    )
};

SideDrawer.defaultProps = {
    links: []
};

export default withRouter(SideDrawer)