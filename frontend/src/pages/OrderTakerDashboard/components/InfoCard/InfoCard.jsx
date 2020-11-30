import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import React from "react";


const useStyles = makeStyles((theme) => ({
    card: {
        minWidth: '200px',
        maxWidth: '300px',
    },
    root: {
        padding: 15,
    },
    title: {
        padding: '5px',
        textShadow: '1px 1px 4px #b8b8b8',
    },
    description: {
        fontWeight: 'thin',
        opacity: 0.5,
    },
}));

export default function ShopInfo(props) {
    const classes = useStyles();

    return (
        <Card raised className={classes.card}>
            <CardContent className={classes.root}>
                <Typography variant="h3" className={classes.title} align="center">
                    {props.value}
                </Typography>
                <Typography variant="subtitle2" className={classes.description} align="center">
                    {props.description}
                </Typography>
            </CardContent>
        </Card>
    );
}