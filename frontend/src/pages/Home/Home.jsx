import React from "react";
import MainMenuBar from '../../shared/MainMenuBar/MainMenuBar';
import styles from './Home.module.css';

const Home = () => {
    return (
        <div id="home-page" className={styles.content}>
            <MainMenuBar />
            <div className={styles.background}>
            </div>
        </div>
    );
}

export default Home;