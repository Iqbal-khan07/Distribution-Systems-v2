import React, { useEffect, useState } from "react";
import WithSignedInSkeleton from "../../shared/WithSignedInSkeleton/WithSignedInSkeleton";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    rootContainer: {
    }
}));

const mapShopsToShopOptions = (shops) => {
    return shops.map((s) => {
        return {
            id: s.id,
            name: s.name,
            address: `${s.street}, ${'USA'}`,
        }
    })
}


const OrderFulfillerDashboard = () => {
    const classes = useStyles();
    const [loading, setLoading] = useState(true)
    const [shops, setShops] = useState([]);


    useEffect(() => {
        async function fetchData() {
            let response = await axios.get("/shop/request/all");
            let body = response.data;

            const shopOptions = body.request_shop_response.map((s) => {
                return {
                    id: s.id,
                    name: s.name,
                    street: s.street,
                    city: s.city,
                    providence: s.providence,
                    zip: s.zip_4,
                    zoneName: ""
                }
            });
            setShops(shopOptions)
            setLoading(false)
        }
        fetchData().then()
    }, [])


    return (
        <WithSignedInSkeleton title={'Order Fulfiller Dashboard'}>
            {!loading ? (
                <>
                    <Grid container lg={12} xs={12} spacing={3}>
                        <Grid item lg={12} xs={12}>
                            <Grid container>
                                <Grid item lg={12} xs={12}>
                                    {/*<ShopTable
                                        rows={mapShopsToShopOptions(shops)}
                                    />*/}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item lg={12} xs={12}>
                            <Grid container spacing={2}>
                            </Grid>
                        </Grid>
                    </Grid>
                </>
            ) : <CircularProgress />

            }
        </WithSignedInSkeleton>
    )
}

export default OrderFulfillerDashboard