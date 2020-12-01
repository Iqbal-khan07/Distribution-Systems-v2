import React from "react";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import InvoiceTable from '../InvoiceTable/InvoiceTable';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#BFD7DC',
        // padding: theme.spacing(2),
        paddingBottom: theme.spacing(5),
        minWidth: 500,
        marginTop: 30,
    },
    pic: {
        margin: theme.spacing(2),
        width: '150px',
        height: '150px',
    },
    top: {
        marginTop: theme.spacing(2),
    },
    sectionSpacing: {
        marginTop: theme.spacing(4),
    },
}));

export default function OrderInfoPage({ details }) {
    const classes = useStyles();

    return (
        <Paper className={classes.root} elevation={3}>
            <div style={{margin: 20}}>
                <Grid container spacing={2}>
                    <Grid item lg={11}>
                        <Typography variant="h5">Invoice</Typography>
                    </Grid>
                    <Grid item lg={1}>
                        <Tooltip title="Edit Shop" aria-label="Edit Shop">
                            <IconButton size="small">
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
                <Divider />
                <Grid container spacing={2}>
                    <Grid item lg={7} xs={8}>
                        <Grid container spacing={1}>
                            <Grid item lg>
                                <Avatar alt="Shop Photo" src={details.pic} variant="square" className={classes.pic}/>
                            </Grid>
                            <Grid item lg className={classes.top}>
                                <Typography>
                                    INSERT LOGO HERE
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={5} className={classes.top}>
                        <Grid container spacing={0}>
                            <Grid item lg={12} xs={12}>
                                <Typography>
                                    <b>Date: </b>{details.date}
                                </Typography>
                            </Grid>
                            <Grid item lg={12} xs={12}>
                                <Typography>
                                    <b>Invoice #: </b>{details.id}
                                </Typography>
                            </Grid>
                            <Grid item lg={12} xs={12}>
                                <Typography>
                                    <b>Customer Id: </b>{details.shopId}
                                </Typography>
                            </Grid>
                            <Grid item lg={12} xs={12} className={classes.top}>
                                <Typography>
                                    <b>To: </b>{details.shopName}
                                </Typography>
                            </Grid>
                            <Grid item lg={12} xs={12}>
                                <Typography>
                                    {details.street}
                                </Typography>
                            </Grid>
                            <Grid item lg={12} xs={12}>
                                <Typography>
                                    {details.city}, {details.providence} {details.zip}
                                </Typography>
                            </Grid>
                            {details.phone != null &&
                                <Grid item lg={12} xs={12}>
                                    <Typography>
                                        Phone:  {details.phone}
                                    </Typography>
                                </Grid>
                            }
                            {details.email != null &&
                                <Grid item lg={12} xs={12}>
                                    <Typography>
                                        Email:  {details.email}
                                    </Typography>
                                </Grid>
                            }
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container className={classes.sectionSpacing}>
                    <InvoiceTable orderItems={details.orderItems} memo={details.memo}/>
                </Grid>

            </div>
        </Paper>
    );
}