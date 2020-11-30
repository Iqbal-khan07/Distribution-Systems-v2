import React, { useState } from "react";
import WithSignedInSkeleton from "../../shared/WithSignedInSkeleton/WithSignedInSkeleton";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import InfoCard from "./components/InfoCard/InfoCard";
import DataDisplayUtils from "../../utils/DataDisplayUtils";
import CurrentVsTarget from "./components/CurrentVsTarget/CurrentVsTarget";
import OrderByStatus from "./components/OrderByStatus/OrderByStatus";
import axios from 'axios';

export default function OrderTakerDashboard() {
    const [loading, setLoading] = useState(false);
    const series = [44, 55];
    const series2 = [10, 2, 5]
    
    /*
    useEffect(() => {
        async function fetchData() {
            let response = await axios.get("/orders/not_delivered");
            let body = response.data;
            // TODO
            setLoading(false)
        }
        fetchData().then()
    }, [])
    */

    return (
        <WithSignedInSkeleton title={'Dashboard'}>
            {!loading ? (
                <>
                    <Grid container spacing={3}>
                        <Grid item lg={12} xs={12}>
                            <Grid container spacing={3}>
                                <Grid item lg={4} xs={12}>
                                    <InfoCard
                                        value={DataDisplayUtils.numberWithCommas(40000)}
                                        description="Target for the Month"
                                    />
                                </Grid>
                                <Grid item lg={4} xs={12}>
                                    <InfoCard
                                        value={DataDisplayUtils.numberWithCommas(21960)}
                                        description="Current Sales Value"
                                    />
                                </Grid>
                                <Grid item lg={4} xs={12}>
                                    <InfoCard
                                        value={36}
                                        description="Orders Placed This Month"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item lg={12} xs={12}>
                            <Grid container spacing={3}>
                                <Grid item lg={6} xs={12}>
                                    <CurrentVsTarget
                                        series={series}
                                    />
                                </Grid>
                                <Grid item lg={6} xs={12}>
                                    <OrderByStatus
                                        series={series2}
                                    />
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