import React from "react";
import { AppBar, Toolbar, Button} from '@material-ui/core';
import styles from './MainMenuBar.module.css';
import { StylesProvider } from '@material-ui/core/styles';
import { Link } from "react-router-dom";


const MainMenuBar = () => {
    return (
        <StylesProvider injectFirst>
            <AppBar position='static' className={styles.menu}>
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
                    <Button className={styles.login_button}>
                        Log In
                    </Button>
                </Toolbar>
            </AppBar>
        </StylesProvider>
    );
}

export default MainMenuBar;