import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import React from "react";


const useStyles = makeStyles((theme) => ({
    card: {
        minWidth: '200px',
        maxWidth: '300px',
    },
    root: {
        padding: '0px',
    },
    title: {
        backgroundColor: '#232E33',
        color: 'rgb(255,255,255,0.6)',
        padding: '5px',
    },
    display: {
        backgroundColor: '#BFD7DC',
        minWidth: '150px',
        minHeight: '150px',
        fontSize: '70px',
        color: 'rgb(35, 46, 51, 0.8)',
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: '24px',
    },
}));

export default function DeliveredTodayCard(props) {
    const classes = useStyles();

    return (
        <Card raised className={classes.card}>
            <CardContent className={classes.root}>
                <Typography variant="h4" className={classes.title} align="center">
                    Delivered Today
                </Typography>
                <Avatar className={classes.display}>{props.delivered}/{props.total}</Avatar>
            </CardContent>
        </Card>
    );
}