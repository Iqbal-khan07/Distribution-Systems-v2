import React from "react";
import { AppBar, Toolbar, Button} from '@material-ui/core';
import styles from './MenuBar.module.css';
import { StylesProvider } from '@material-ui/core/styles';


const MenuBar = () => {
    return (
        <StylesProvider injectFirst>
            <AppBar position='static' className={styles.menu}>
                <Toolbar className={styles.menu}>
                    <div className={styles.logo}>
                        Commercial Distribution Solutions
                        <img src='../CDSLogo.png' alt='CDS Logo' height='50'/>
                    </div>
                    <div className={styles.grow}/>
                    <Button className={styles.button}>
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

export default MenuBar;