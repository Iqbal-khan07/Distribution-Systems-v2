import React from "react";
import MainMenuBar from '../../shared/MainMenuBar/MainMenuBar';
import { Team, Intro, Technologies, Purpose } from "./about.json";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    contentContainer: {
        background: 'linear-gradient(to bottom right, #232E33, #284b38)',
        backgroundSize: 'cover'
    },
    top: {
        height: '100vh',
        display: 'flex'
    },
    
    topImage: {
        display: 'block',
        position: 'absolute',
        objectFit: 'cover',
        height: '100vh',
        top: 0,
        right: 'left',
        width: '100%'
    },
    title: {
        position: 'absolute',
        textAlign: 'center',
        alignSelf: 'center',
        color: 'white',
        fontWeight: 100,
        fontSize: '60px',
        textShadow: '2px 2px 8px #000000',
        marginLeft: '15px',
    },
    content: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    infoSection: {
        maxWidth: '80%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '50px'
    },
    sectionTitle: {
        fontSize: '35px',
        textTransform: 'uppercase',
        fontWeight: 100,
        color: 'rgb(255, 255, 255, 0.8)'
    },

    sectionBody: {
        fontSize: '20px',
        textAlign: 'justify',
        lineHeight: 1.5,
        color: 'rgb(255, 255, 255, 0.6)'
    }
}))


const About = () => {
    const classes = useStyles(); 
    return (
        <div id="about-page" className={classes.contentContainer}>
            <MainMenuBar />
            <div className={classes.top}>
                <img
                    src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2704&q=80"
                    className={classes.topImage}
                    alt=""
                />
                <h1 className={classes.title}>Tools to run your distribution center</h1>
            </div>
            <div className={classes.content}>
                <div className={classes.infoSection}>
                    <h2 className={classes.sectionTitle}>Our Team</h2>
                    <p className={classes.sectionBody}>
                        <ul>
                            <li>{Team.backend[0].name}</li>
                            <li>{Team.backend[1].name}</li>
                            <li>{Team.frontend[0].name}</li>
                            <li>{Team.frontend[1].name}</li>
                        </ul>
                    </p>
                </div>

                <div className={classes.infoSection}>
                    <h2 className={classes.sectionTitle}>What is Commercial Distribution Solutions?</h2>
                    <p className={classes.sectionBody}>
                        {Intro}
                    </p>
                </div>

                <div className={classes.infoSection}>
                    <h2 className={classes.sectionTitle}>How Did We Make CDS?</h2>
                    <p className={classes.sectionBody}>
                        {Technologies}
                    </p>
                </div>

                <div className={classes.infoSection}>
                    <h2 className={classes.sectionTitle}>Purpose</h2>
                    <p className={classes.sectionBody}>
                        {Purpose}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default About;