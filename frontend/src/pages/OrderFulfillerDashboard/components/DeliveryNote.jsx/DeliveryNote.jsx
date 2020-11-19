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
        maxHeight: 200,
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
                            <b>Payment Due: ${details.paymentDue}</b>
                        </ListItem>
                    </List>
                </Card>
                <Typography className={classes.top}>
                    <b>Memo:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc mattis mauris iaculis pharetra congue. Aliquam erat volutpat. Aliquam sit amet leo tincidunt, tincidunt lacus eu, rhoncus nibh. Nulla iaculis nunc dolor. Donec molestie, enim id sagittis pretium, enim arcu tincidunt eros, non iaculis turpis dolor condimentum erat. Suspendisse porttitor viverra tortor, ac lobortis nisi ullamcorper vel. In rhoncus massa mauris, at hendrerit sapien feugiat at. Aliquam vel consequat quam. Maecenas nibh ex, facilisis lacinia magna nec, finibus pulvinar mi. Donec hendrerit fringilla enim sit amet lacinia. In rutrum ultricies mi at ultricies. Nulla pharetra in felis id auctor. Aliquam neque leo, consectetur nec consequat eu, laoreet in nunc. Aliquam auctor porta libero. Sed sed sem consequat, ultricies lectus eget, porta diam. Nunc varius ut dui fermentum condimentum.


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