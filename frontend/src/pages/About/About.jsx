import React from "react";
import MainMenuBar from '../../shared/MainMenuBar/MainMenuBar';
import styles from './About.module.css';
import { Team, Intro, Technologies, Purpose } from "./about.json";
import { WarehouseImage } from "../../assests/images/Warehouse.jpg";

const About = () => {
    return (
        <div id="about-page" className={styles.contentContainer}>
            <MainMenuBar />
            <div className={styles.top}>
                <img src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2704&q=80" className={styles.topImage} alt=""></img>
                <h1 className={styles.title}>Tools to run your distribution center</h1>
            </div>
            <div className={styles.content}>
                <div className={styles.infoSection}>
                    <h2 className={styles.sectionTitle}>Our Team</h2>
                    <p className={styles.sectionBody}>
                        <ul>
                            <li>{Team.backend[0].name}</li>
                            <li>{Team.backend[1].name}</li>
                            <li>{Team.frontend[0].name}</li>
                            <li>{Team.frontend[1].name}</li>
                        </ul>
                    </p>
                </div>

                <div className={styles.infoSection}>
                    <h2 className={styles.sectionTitle}>What is Commercial Distribution Solutions?</h2>
                    <p className={styles.sectionBody}>
                        {Intro}
                    </p>
                </div>

                <div className={styles.infoSection}>
                    <h2 className={styles.sectionTitle}>How Did We Make CDS?</h2>
                    <p className={styles.sectionBody}>
                        {Technologies}
                    </p>
                </div>

                <div className={styles.infoSection}>
                    <h2 className={styles.sectionTitle}>Purpose</h2>
                    <p className={styles.sectionBody}>
                        {Purpose}
                    </p>
                </div>

            </div>
        </div>
    );
}

export default About;