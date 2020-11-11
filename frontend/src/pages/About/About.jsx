import React from "react";
import MainMenuBar from '../../shared/MainMenuBar/MainMenuBar';
import styles from './About.module.css';

const About = () => {
    return (
        <div id="home-page" className={styles.content}>
            <MainMenuBar />
            <div className={styles.background}>
            </div>
        </div>
    );
}

export default About;