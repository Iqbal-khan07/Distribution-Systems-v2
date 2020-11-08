import React from "react";
import MenuBar from './components/MenuBar';
import styles from './Home.module.css';

const Home = () => {
    return (
        <div id="home-page" className={styles.content}>
            <MenuBar />
            <div className={styles.background}>
            </div>
        </div>
    );
}

export default Home;