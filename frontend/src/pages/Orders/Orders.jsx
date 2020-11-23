import React, { useEffect, useState } from "react";
import WithSignedInSkeleton from "../../shared/WithSignedInSkeleton/WithSignedInSkeleton";
import ShowAddOrderFormButton from "./components/ShowAddOrderFormButton/ShowAddOrderFormButton";
import OrderTable from "./components/OrderTable/OrderTable";
import OrderForm from "./components/OrderForm/OrderForm";
import OrderInfoPage from "./components/OrderInfoPage/OrderInfoPage";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import OrderStatus from "./components/OrderStatus/OrderStatus";
import axios from 'axios';

// const shopRows = [
//     createData(1001, 'ABC General Store', '01/01/2020', '$350.00', 'Leave with Manager', 'Delivered'),
//     createData(1002, 'Super Mart', '01/02/2020', '$150.00', '', 'Paid'),
//     createData(1003, 'Corner Central', '01/13/2020', '$400.00', '', 'Pending'),
//     createData(1004, 'General Plus', '03/01/2020', '$350.00', 'Leave with Manager', 'Paid'),
//     createData(1005, 'ABC General Store', '01/01/2020', '$350.00', 'Leave with Manager', 'Delivered'),
//     createData(1006, 'ABC General Store', '01/01/2020', '$350.00', 'Leave with Manager', 'Delivered'),
//     createData(1007, 'ABC General Store', '01/01/2020', '$350.00', 'Leave with Manager', 'Delivered'),
//     createData(1008, 'ABC General Store', '01/01/2020', '$350.00', 'Leave with Manager', 'Delivered'),
//     createData(1009, 'ABC General Store', '01/01/2020', '$350.00', 'Leave with Manager', 'Delivered'),
//     createData(1010, 'ABC General Store', '01/01/2020', '$350.00', 'Leave with Manager', 'Delivered'),
//     createData(1011, 'ABC General Store', '01/01/2020', '$350.00', 'Leave with Manager', 'Delivered'),
//     createData(1012, 'ABC General Store', '01/01/2020', '$350.00', 'Leave with Manager', 'Delivered'),
//     createData(1013, 'ABC General Store', '01/01/2020', '$350.00', 'Leave with Manager', 'Delivered'),
//     createData(1014, 'ABC General Store', '01/01/2020', '$350.00', 'Leave with Manager', 'Delivered'),
// ];

// function createData(id, customer, date, amount, memo, status) {
//     return { id, customer, date, amount, memo, status };
// }

const useStyles = makeStyles((theme) => ({
    rootContainer: {
    }
}));

// const shopOptions = [
//     {
//         id: 1,
//         name: 'ABC General Store',
//         zone: "Kunj"
//     }
// ];

// productOptions: {
//      id: number
//      name: string
//      unitPrice: number
// }

// const orderDetails = {
//     id: 1001,
//     date: "01/01/2020",
//     shopId: 1140000,
//     pic: "",
//     shopName: "ABC General Store",
//     street: "123 Main Street",
//     city: "Anytown",
//     providence: "NJ",
//     zip: "07424",
//     phone: "800-555-5555",
//     email: null,
//     orderItems: [
//         { productName: "Super Salted Crinkle-50", productUnitPrice: 45.00, unitsOrdered: 8, productTotalCost: 45.00 }
//     ],
//     memo: ""
// };

const calculateTotalAmountFromOrderItems = (orderItems) => {
    let cost = 0;
    for (let i = 0; i < orderItems.length; i++) {
        cost += orderItems[i].productTotalCost
    }
    return cost;
}

const mapOrdersToOrderOptions = (orders) => {
    return orders.map((o) => {
        return {
            id: o.id,
            customer: o.shopName,
            date: o.date,
            amount: calculateTotalAmountFromOrderItems(o.orderItems),
            memo: o.memo,
            status: 'Pending'
        }
    })

}

const Orders = () => {
    const classes = useStyles();
    const [productOptions, setProductOptions] = useState([]);
    const [orders, setOrders] = useState([]);
    const [shopOptions, setShopOptions] = useState([]);
    const [showOrderForm, setOrderForm] = useState(false)
    const [loading, setLoading] = useState(true)
    const [selectedOrder, setSelectedOrder] = useState(null);

    // TODO FIX THE ORDER FORM!
    useEffect(() => {
        async function fetchData() {
            let response = await axios.get("company_product/request/all");
            let body = response.data;
            const productsList = body.data.map((p) => {
                return {
                    id: p.id,
                    name: p.name,
                    unitPrice: p.price_sell_per_unit
                }
            })
            setProductOptions(productsList)

            response = await axios.get("/shop/request/not_delivered");
            body = response.data;

            const orders = body.data.map((o) => {
                const orderItems = o.shop_order_items.map((item) => {
                    return {
                        productName: item.company_product.name,
                        productUnitPrice: item.company_product.price_sell_per_unit,
                        unitsOrdered: item.quantity_units,
                        productTotalCost: item.quantity_units * item.company_product.price_sell_per_unit
                    }
                })

                return {
                    id: o.id,
                    date: (new Date(o.date_ordered)).toDateString(),
                    shopId: o.shop.id,
                    pic: "",
                    shopName: o.shop.name,
                    street: o.shop.street,
                    city: o.shop.city,
                    providence: o.shop.providence,
                    zip: o.shop.zip_4,
                    phone: o.shop.phone_number,
                    email: o.shop.email,
                    orderItems: orderItems,
                    memo: ""
                }
            })

            response = await axios.get("/shop/request/all");
            body = response.data;

            const shopOptions = body.data.map((s) => {
                return {
                    id: s.id,
                    name: s.name,
                    zone: ""
                }
            });
            setShopOptions(shopOptions);
            setSelectedOrder(orders[0])
            setOrders(orders)
            setLoading(false)
        }
        fetchData().then()
    }, [])




    const onFormShowHandler = () => {
        setOrderForm(true)
    }

    const onFormCloseHandler = () => {
        setOrderForm(false)
    }

    const orderShowDetailHandler = (orderId) => {
        const selectedShop = orders.filter((o) => o.id === orderId);
        setSelectedOrder(selectedShop[0])
    }

    return (
        <WithSignedInSkeleton title={"Orders"}>
            {!loading ? (
                <>
                    <Grid container lg={12} xs={12} spacing={3}>
                        <Grid item lg={9} xs={12}>
                            <Grid container>
                                <Grid item lg={12} xs={12}>
                                    <OrderTable
                                        rows={mapOrdersToOrderOptions(orders)}
                                        orderShowDetailHandler={orderShowDetailHandler}
                                    />
                                </Grid>
                                <Grid item lg={12} xs={12}>
                                    <OrderInfoPage
                                        details={selectedOrder}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item lg={3} xs={12}>
                            <Grid container spacing={2} justify="center">
                                <Grid item lg={12} xs={6}>
                                    <ShowAddOrderFormButton
                                        disable={showOrderForm}
                                        onClickHandler={onFormShowHandler}
                                        title={"Add New Order"}
                                    />
                                </Grid>
                                <Grid item lg={12} xs={6}>
                                    <OrderStatus
                                        delivered={0}
                                        paid={0}
                                        pending={2}
                                        credit={0}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    {showOrderForm ? (
                        <OrderForm
                            showForm={showOrderForm}
                            onCloseButtonHandler={onFormCloseHandler}
                            shops={shopOptions}
                            products={productOptions}
                        />
                    ) : null}
                </>

            ) : <CircularProgress />

            }

        </WithSignedInSkeleton>

    )
};

export default Orders;