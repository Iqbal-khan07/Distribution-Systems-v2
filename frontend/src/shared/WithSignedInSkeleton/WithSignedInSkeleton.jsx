import React, {useContext} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {UserContext} from "../../context/UserContext";
import Navbar from "../Navbar/NavBar";
import SideDrawer from "../SideDrawer/SideDrawer";
import {Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },

    title: {
        color: '#5DB285',
    },
    
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },

    contentContainer: {
        paddingTop: theme.spacing(3),
    },
}));

const WithSignedInSkeleton = ({children, title}) => {
    const classes = useStyles();
    const {user} = useContext(UserContext);
    const [open, setOpen] = React.useState(true);

    const handleToggleOpen = () => {
        open ? setOpen(false): setOpen(true);
    };

    const handleLogout = () => {

    }

    return (
        <div className={classes.root}>
            <Navbar
                expanded={open}
                userName={user.name}
                handleToggleOpen={handleToggleOpen}
                handleLogout={handleLogout}
            />

            <SideDrawer
                open={open}
                links={user.links}
            />

            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Typography variant={"h4"} className={classes.title}>{title}</Typography>
                <div className={classes.contentContainer}>
                {children}
                </div>
            </main>
        </div>
    )
}

export default WithSignedInSkeleton