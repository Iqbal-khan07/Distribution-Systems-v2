import React from "react";
import MainMenuBar from '../../shared/MainMenuBar/MainMenuBar';
import { Team, Intro, Technologies, Purpose } from "./about.json";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import IconButton from '@material-ui/core/IconButton';
import EmailIcon from '@material-ui/icons/Email';

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
    },
    people: {
        listStyleType: 'none',
        paddingLeft: 0,
    },
    major: {
        fontStyle: 'italic',
    },
    description: {
        marginTop: 10,
    },
    link: {
        color: 'rgb(255, 255, 255, 0.6)',
        '&:hover': {
            color: "#BFDCCD"
        }
    }
}))


const About = () => {
    const classes = useStyles();
    const memberDisplay = (name, major, gradDate, description, email, linkedin) => {
        return (
            <div>
                <Typography variant="h4">
                    {name}
                </Typography>
                <Typography className={classes.major}>
                    {major}
                </Typography>
                <Typography>
                    {gradDate}
                </Typography>
                <Typography variant="h6" className={classes.description}>
                    {description}
                </Typography>
                <IconButton>
                    <a className={classes.link} target="_blank" href={`mailto:${email}@njit.edu`}>
                        <EmailIcon />
                    </a>
                </IconButton>
                {linkedin != ""?
                <IconButton>
                    <a className={classes.link} target="_blank" href={`https://www.linkedin.com/in/${linkedin}/`}>
                        <LinkedInIcon />
                    </a>
                </IconButton>: null
                }

            </div>
        );
    };
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
                    <div className={classes.sectionBody}>
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <Grid container spacing={3}>
                                    <Grid item xs={6} align="center">
                                        {memberDisplay(Team.backend[0].name, "Computer Science Major", "Expected Graduation: May 2021",
                                            "I love sports and on my free time I like to play video games.",
                                            "aka59", "")}
                                    </Grid>
                                    <Grid item xs={6} align="center">
                                        {memberDisplay(Team.backend[1].name, "Computer Science Major", "Expected Graduation: May 2021",
                                            "I've been programming since I was 14 and I really enjoy playing chess.",
                                            "tma26", "")}
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={3}>
                                    <Grid item xs={6} align="center">
                                        {memberDisplay(Team.frontend[0].name, "Computer Science & Math Major", "Expected Graduation: May 2022",
                                            "I like to cook and I can play 4 different instruments (guitar, flute, ukulele and drums",
                                            "dm464", "dm464")}
                                    </Grid>
                                    <Grid item xs={6} align="center">
                                        {memberDisplay(Team.frontend[1].name, "Computer Science Major", "Expected Graduation: May 2021",
                                            "I am quadlingual (English, Urdu, Hindko and Arabic) and I like watching political shows.",
                                            "zn9", "zoraiznaeem")}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
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