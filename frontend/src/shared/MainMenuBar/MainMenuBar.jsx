import React from "react";
import { AppBar, Toolbar, Button} from '@material-ui/core';
import styles from './MainMenuBar.module.css';
import { StylesProvider } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import SignInDialogue from "./components/SignInDialogue";

const MainMenuBar = () => {
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    return (
        <StylesProvider injectFirst>
            <AppBar position='sticky' className={styles.menu}>
                <Toolbar className={styles.menu}>
                    <Button className={styles.logo} component={Link} to="/">
                        Commercial Distribution Solutions
                        <img src='../CDSLogo.png' alt='CDS Logo' height='50'/>
                    </Button>
                    <div className={styles.grow}/>
                    <Button className={styles.button} component={Link} to="/about">
                        About Us
                    </Button>
                    <Button className={styles.button}>
                        Pricing
                    </Button>
                    <Button className={styles.login_button} onClick={handleClickOpen}>
                        Log In
                    </Button>
                    <SignInDialogue open={open} onClose={handleClose} />
                </Toolbar>
            </AppBar>
        </StylesProvider>
    );
}

export default MainMenuBar;