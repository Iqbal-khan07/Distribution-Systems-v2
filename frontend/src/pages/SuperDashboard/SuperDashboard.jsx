import React, { useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import WithSignedInSkeleton from "../../shared/WithSignedInSkeleton/WithSignedInSkeleton";
import { AppBar, Toolbar, Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: "#5DB285",
        padding: theme.spacing(3),
        minWidth: 400,
        margin: theme.spacing(5),
        '&:hover': {
            backgroundColor: "#BFDCCD",
            color: "#e5e4e4"
        }
    },
}));

export default function SuperDashboard() {
    const [loading, setLoading] = useState(false);
    const classes = useStyles();
    return (
        <WithSignedInSkeleton title={'Dashboard'}>
            {!loading ? (
                <>
                    <Grid container spacing={2}>
                        <Grid item xs={12} align="center">
                            <Typography variant="h3">
                                What would you like to do today?
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={6} align="center">
                                    <Button className={classes.button} component={Link} to="/shoptracker">
                                        <Typography variant="h5">
                                        Check on Shops
                                        </Typography>
                                    </Button>
                                </Grid>
                                <Grid item xs={6} align="center">
                                    <Button className={classes.button} component={Link} to="/orders">
                                        <Typography variant="h5">
                                        Manage Orders
                                        </Typography>
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={6} align="center">
                                    <Button className={classes.button} component={Link} to="/inventory">
                                        <Typography variant="h5">
                                        Manage Inventory
                                        </Typography>
                                    </Button>
                                </Grid>
                                <Grid item xs={6} align="center">
                                    <Button className={classes.button} component={Link} to="/employees">
                                        <Typography variant="h5">
                                        Check Employee Status
                                        </Typography>
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </>
            ) : <CircularProgress />

            }
        </WithSignedInSkeleton>
    )
}