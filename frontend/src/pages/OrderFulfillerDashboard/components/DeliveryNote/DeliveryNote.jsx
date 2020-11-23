import React from "react";
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Tooltip from '@material-ui/core/Tooltip';
import DoneIcon from '@material-ui/icons/Done';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import DataDisplayUtils from "../../../../utils/DataDisplayUtils";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#BFD7DC',
        //paddingBottom: theme.spacing(5),
        width: 300,
    },
    content: {
        height: 400,
        overflow: "auto",
    },
    bottom: {
        marginBottom: theme.spacing(2),
    },
    top: {
        marginTop: theme.spacing(2),
    },
    sectionSpacing: {
        marginTop: theme.spacing(4),
    },
    list: {
        overflow: "auto",
        maxHeight: 180,
    },
    button: {
        color: "white",
    },
    actionArea: {
        justifyContent: "flex-end",
    },
}));

export default function DeliveryNote({ details }) {
    const classes = useStyles();

    return (
        <Card className={classes.root} elevation={3}>
            <CardContent className={classes.content}>
                <Typography variant="h6"><b>Order No. {details.id}</b></Typography>
                <Divider className={classes.bottom} />
                <Typography>
                    <b>Deliver to:</b>
                </Typography>
                <Typography>
                    {details.name}
                </Typography>
                <Typography>
                    {details.street}
                </Typography>
                <Typography className={classes.bottom}>
                    {details.city}, {details.providence} {details.zip}
                </Typography>
                <Card>
                    <List className={classes.list} dense disablePadding>
                        {details.orderItems.map((order) => {
                            return (
                                <ListItem>
                                    <Grid container>
                                        <Grid item xs={3}>
                                            {order.quantity}
                                        </Grid>
                                        <Grid item xs={9}>
                                            {order.productName}
                                        </Grid>
                                    </Grid>
                                </ListItem>
                            );
                        })}
                        <ListItem className={classes.top}>
                            <b>Payment Due: {DataDisplayUtils.displayMoneyValue(details.paymentDue)}</b>
                        </ListItem>
                    </List>
                </Card>
                <Typography className={classes.top}>
                    <b>Memo:</b>


                </Typography>
                <Typography>
                    {details.memo}
                </Typography>
            </CardContent>
            <CardActions className={classes.actionArea}>
                <Tooltip title="Mark delivered" aria-label="Mark delivered">
                    <Fab size="small" color="primary">
                        <DoneIcon className={classes.button} />
                    </Fab>
                </Tooltip>
            </CardActions>

        </Card>
    );
}