import React from "react";
import { AppBar, Toolbar, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import SignInDialogue from "../../pages/SignInDialogue/SignInDialogue";

const useStyles = makeStyles(() => ({
    grow: {
        flexGrow: 1
    },
    
    menu: {
        backgroundColor: '#232E33',
        minHeight: 90,
    },
    
    logo: {
        alignItems: 'center',
        fontSize: 28,
        color: 'rgb(255, 255, 255, 0.9)',
    },
    
    button: {
        color: 'rgb(255, 255, 255, 0.7)',
        marginLeft: 20,
    },
    
    login_button: {
        composes: 'button',
        background: '#5DB285',
        paddingRight: 15,
        paddingLeft: 15,
        borderRadius: 15,
    }
}))


const MainMenuBar = () => {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    return (
        <AppBar position='sticky' className={classes.menu}>
            <Toolbar className={classes.menu}>
                <Button className={classes.logo} component={Link} to="/">
                    Commercial Distribution Solutions
                    <img src='../CDSLogo.png' alt='CDS Logo' height='50'/>
                </Button>
                <div className={classes.grow}/>
                <Button className={classes.button} component={Link} to="/about">
                    About Us
                </Button>
                <Button className={classes.button}>
                    Pricing
                </Button>
                <Button className={classes.login_button} onClick={handleClickOpen}>
                    Log In
                </Button>
                <SignInDialogue open={open} onClose={handleClose} />
            </Toolbar>
        </AppBar>
    );
}

export default MainMenuBar;