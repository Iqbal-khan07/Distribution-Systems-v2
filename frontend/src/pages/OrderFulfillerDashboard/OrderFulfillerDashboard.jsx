import React, { useEffect, useState } from "react";
import WithSignedInSkeleton from "../../shared/WithSignedInSkeleton/WithSignedInSkeleton";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';
import DeliveryProductTable from "./components/DeliveryProductTable/DeliveryProductTable";

const useStyles = makeStyles((theme) => ({
    rootContainer: {
    }
}));

const mapOrdersToOrderOptions = (orders) => {
    return orders.map((s) => {
        return s.orderItems.map((o) => {
            return {
                id: o.productNumber,
                name: o.productName,
                description: o.productDescription,
                quantity: o.quantity
            }
        })
    }).flat()
}


const OrderFulfillerDashboard = () => {
    //const classes = useStyles();
    const [loading, setLoading] = useState(true)
    const [orders, setOrders] = useState([]);


    useEffect(() => {
        async function fetchData() {
            let response = await axios.get("/shop/request/not_delivered");
            let body = response.data;

            const orderOptions = body.request_shop_order_not_delivered_response.map((s) => {
                return {
                    id: s.id,
                    name: s.shop.name,
                    street: s.shop.street,
                    city: s.shop.city,
                    providence: s.shop.providence,
                    zip: s.shop.zip_4,
                    zoneName: "",
                    orderItems: s.shop_order_items.map((o) => {
                        return {
                            productName: o.company_product.name,
                            productNumber: o.company_product.id,
                            productDescription: o.company_product.description,
                            quantity: o.quantity_units
                        }
                    }),
                    paymentDue: s.price_due,
                    memo: ""
                }
            });
            setOrders(orderOptions)
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
                                    <DeliveryProductTable
                                        rows={mapOrdersToOrderOptions(orders)}
                                    />
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