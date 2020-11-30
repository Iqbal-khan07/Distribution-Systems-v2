import React, { useState, useEffect, useContext } from "react";
import WithSignedInSkeleton from "../../shared/WithSignedInSkeleton/WithSignedInSkeleton";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import InfoCard from "./components/InfoCard/InfoCard";
import DataDisplayUtils from "../../utils/DataDisplayUtils";
import CurrentVsTarget from "./components/CurrentVsTarget/CurrentVsTarget";
import OrderByStatus from "./components/OrderByStatus/OrderByStatus";
import { UserContext } from "../../context/UserContext"
import axios from 'axios';

export default function OrderTakerDashboard() {
    const [loading, setLoading] = useState(true);
    const [goalInfo, setGoalInfo] = useState({});
    const { user } = useContext(UserContext);
    const [salesSeries, setSalesSeries] = useState([44, 55]);
    const [orderSeries, setOrderSeries] = useState([10, 2, 5]);

    useEffect(() => {
        async function fetchData() {
            let response = await axios.post('/goal/order_taker', {
                data: {
                    order_taker_id: user.id
                }
            });
            let body = response.data;

            console.log(body);
            const orderOptions = {
                goal: body.data.goal_total,
                current: body.data.current_value_total,
                orders: body.data.num_orders_total,
                orders_paid: body.data.orders_paid,
                orders_pending: body.data.orders_pending
            };
            setGoalInfo(orderOptions);
            setLoading(false);
        }
        fetchData().then()
    }, [])

    console.log(goalInfo);
    return (
        <WithSignedInSkeleton title={'Dashboard'}>
            {!loading ? (
                <>
                    <Grid container spacing={3}>
                        <Grid item lg={12} xs={12}>
                            <Grid container spacing={3}>
                                <Grid item lg={4} xs={12}>
                                    <InfoCard
                                        value={DataDisplayUtils.numberWithCommas(goalInfo.goal)}
                                        description="Target for the Month"
                                    />
                                </Grid>
                                <Grid item lg={4} xs={12}>
                                    <InfoCard
                                        value={DataDisplayUtils.numberWithCommas(goalInfo.current)}
                                        description="Current Sales Value"
                                    />
                                </Grid>
                                <Grid item lg={4} xs={12}>
                                    <InfoCard
                                        value={DataDisplayUtils.numberWithCommas(goalInfo.orders)}
                                        description="Orders Placed This Month"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item lg={12} xs={12}>
                            <Grid container spacing={3}>
                                <Grid item lg={6} xs={12}>
                                    <CurrentVsTarget
                                        series={salesSeries}
                                    />
                                </Grid>
                                <Grid item lg={6} xs={12}>
                                    <OrderByStatus
                                        series={orderSeries}
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