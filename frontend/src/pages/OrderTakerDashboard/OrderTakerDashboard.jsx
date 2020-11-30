import React, {useState} from "react";
import WithSignedInSkeleton from "../../shared/WithSignedInSkeleton/WithSignedInSkeleton";
import CircularProgress from "@material-ui/core/CircularProgress";
import CurrentVsTarget from "./components/CurrentVsTarget/CurrentVsTarget";
import Grid from "@material-ui/core/Grid"
import OrderByStatus from "./components/OrderByStatus/OrderByStatus";

export default function OrderTakerDashboard() {
    const [loading, setLoading] = useState(false)
    const series = [44, 55];
    const series2 = [10, 2, 5]
    return (
        <WithSignedInSkeleton title={'Dashboard'}>
            {!loading ? (
                <Grid container direction={"column"}>
                    <Grid item container spacing={2}>
                        <Grid item>
                            <p>Target For Month</p>
                        </Grid>
                        <Grid item>
                            <p>Current Sales</p>
                        </Grid>
                        <Grid item>
                            <p>Orders placed this month</p>
                        </Grid>
                    </Grid>
                    <Grid item container justify={"space-around"}>
                        <Grid item>
                            <div style={{marginBottom: 20}}>
                                <CurrentVsTarget
                                    series={series}
                                />
                            </div>
                        </Grid>
                        <Grid item>
                            <OrderByStatus
                                series={series2}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            ) : <CircularProgress />

            }
        </WithSignedInSkeleton>
    )
}