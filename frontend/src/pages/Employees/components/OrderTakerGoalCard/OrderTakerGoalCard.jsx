import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import DataDisplayUtils from "../../../../utils/DataDisplayUtils";
import React from "react";


const useStyles = makeStyles((theme) => ({
    card: {
        minWidth: '200px',
        maxWidth: '300px',
        margin: 0,
    },
    root: {
        padding: '0px',
    },
    title: {
        backgroundColor: '#232E33',
        color: 'rgb(255,255,255,0.6)',
        padding: '5px',
    },
    heading: {
        padding: '5px',
        textShadow: '1px 1px 4px #b8b8b8',
    },
    description: {
        fontWeight: 'thin',
        opacity: 0.5,
    },

}));

export default function OrderTakerGoalCard(props) {
    const classes = useStyles();
    const section = (title, value) => {
        return (
            <div>
                <Typography variant="h3" className={classes.heading} align="center">
                    {title}
                </Typography>
                <Typography variant="subtitle2" className={classes.description} align="center">
                    {value}
                </Typography>
            </div>
        );
    };
    return (
        <Card raised className={classes.card}>
            <CardContent className={classes.root}>
                <Typography variant="h6" className={classes.title} align="center">
                    {props.name}'s Goal Status
                </Typography>
                {section(DataDisplayUtils.numberWithCommas(props.goal), "Target for the Month")}
                {section(DataDisplayUtils.numberWithCommas(props.current), "Current Sales Value")}
                {section(DataDisplayUtils.numberWithCommas(props.order), "Orders Placed this Month")}
            </CardContent>
        </Card>
    );
}