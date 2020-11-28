import React, { useEffect, useState } from "react";
import WithSignedInSkeleton from "../../shared/WithSignedInSkeleton/WithSignedInSkeleton";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';
import DeliveryProductTable from "./components/DeliveryProductTable/DeliveryProductTable";
import DeliveriesGrid from "./components/DeliveriesGrid/DeliveriesGrid";

const useStyles = makeStyles((theme) => ({
    rootContainer: {
    },
}));

const mapOrdersToOrderItems = (orders) => {
    let allProducts = orders.map((s) => {
        return s.orderItems.map((o) => {
            return {
                id: o.productNumber,
                name: o.productName,
                description: o.productDescription,
                quantity: o.quantity
            }
        })
    }).flat();
    let aggregateProducts = [];
    for (let i=0; i < allProducts.length; i++) {
        let increased = false;
        for (let j=0; j < aggregateProducts.length; j++) {
            if (allProducts[i].id === aggregateProducts[j].id) {
                aggregateProducts[j].quantity += allProducts[i].quantity;
                increased = true;
                break;
            }
        }
        if (!increased)
            aggregateProducts.push(allProducts[i]);
    }
    return aggregateProducts;
}


const OrderFulfillerDashboard = () => {
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);;


    useEffect(() => {
        async function fetchData() {
            let response = await axios.get("/orders/not_delivered");
            let body = response.data;


            const orderOptions = body.data.map((s) => {
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
        <WithSignedInSkeleton title={'Dashboard'}>
            {!loading ? (
                <>
                    <Grid container spacing={3} className={classes.rootContainer}>
                        <Grid item lg={12} xs={12}>
                            <Grid container>
                                <Grid item lg={8} xs={12}>
                                    <DeliveryProductTable
                                        rows={mapOrdersToOrderItems(orders)}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item lg={12} xs={12}>
                            <Grid container spacing={2}>
                                <Grid item lg={12} xs={12}>
                                    <DeliveriesGrid orders={orders} />
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

export default OrderFulfillerDashboard