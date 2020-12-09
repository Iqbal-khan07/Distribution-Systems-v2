import React from "react";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
    card: {
        minWidth: '200px',
        maxWidth: '300px',
    },
    root: {
        padding: '10px',
    },
    title: {
        backgroundColor: '#232E33',
        color: 'rgb(255,255,255,0.6)',
        padding: '5px',
    },
    display: {
        backgroundColor: '#BFD7DC',
        minWidth: 80,
        minHeight: 80,
        fontSize: 40,
        color: 'D7D8D8',
        marginRight: "0 10px",
        marginTop: '10px',
        marginBottom: '10px',
        display: "inline-flex"
    },

    statusText: {

    },

    delivered: {
        backgroundColor: "#5DB285"
    },
    pending: {
        backgroundColor: "#FB7373"
    },
    paid: {
        backgroundColor: "#F6E337"
    },
    credit: {
        backgroundColor: "#BFD7DC"
    },
}));



export default function OrderStatus({delivered, pending, paid, credit}){
    const classes = useStyles()
    return (
        <Card raised className={classes.card}>
            <Typography variant="h4" className={classes.title} align="center">
                    Order Status
            </Typography>
            <CardContent className={classes.root}>
                <div className={classes.statusHolder}>
                    <Avatar className={clsx(classes.display, classes.delivered)}>{delivered}</Avatar>
                    <Typography variant="h5"  display={"inline"} style={{marginLeft: 30}}>
                        Delivered
                    </Typography>
                </div>
                <hr />
                <div>
                    <Typography variant="h5" display={"inline"} style={{marginRight: 40}} >
                        Pending
                    </Typography>
                    <Avatar className={clsx(classes.display, classes.pending)}>
                        {pending}
                    </Avatar>
                </div>
                <hr />
                <div>
                    <Avatar className={clsx(classes.display, classes.paid)}>{paid}</Avatar>
                    <Typography variant="h5" display={"inline"} style={{marginLeft: 40}}>
                        Paid
                    </Typography>
                </div>
                <hr />
                <div>
                    <Typography variant="h5" display={"inline"} style={{marginRight: 80}}>
                        Credit
                    </Typography>
                    <Avatar className={clsx(classes.display, classes.credit)}>{credit}</Avatar>
                </div>

            </CardContent>
        </Card>
    )
}

