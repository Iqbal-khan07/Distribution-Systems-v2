import React, { useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import WithSignedInSkeleton from "../../shared/WithSignedInSkeleton/WithSignedInSkeleton";
import { AppBar, Toolbar, Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: "BFDCCD",
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
                        <Grid item xs={12}>
                            <Typography>
                                What would you like to do today?
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Button className={classes.button} component={Link} to="/shoptracker">
                                        Check on Shops
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button className={classes.button} component={Link} to="/orders">
                                        Manage Orders
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Button className={classes.button} component={Link} to="/inventory">
                                        Manage Inventory
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button className={classes.button} component={Link} to="/employees">
                                        Check Employee Status
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