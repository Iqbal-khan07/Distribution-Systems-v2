import React, { useState } from "react";
import WithSignedInSkeleton from "../../shared/WithSignedInSkeleton/WithSignedInSkeleton";
import ShowAddOrderFormButton from "./components/ShowAddOrderFormButton/ShowAddOrderFormButton";
import OrderTable from "./components/OrderTable/OrderTable";
import OrderForm from "./components/OrderForm/OrderForm";
import OrderInfoPage from "./components/OrderInfoPage/OrderInfoPage";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import OrderStatus from "./components/OrderStatus/OrderStatus";



const shopRows = [
    createData(1001, 'ABC General Store', '01/01/2020', '$350.00', 'Leave with Manager', 'Delivered'),
    createData(1002, 'Super Mart', '01/02/2020', '$150.00', '', 'Paid'),
    createData(1003, 'Corner Central', '01/13/2020', '$400.00', '', 'Pending'),
    createData(1004, 'General Plus', '03/01/2020', '$350.00', 'Leave with Manager', 'Paid'),
    createData(1005, 'ABC General Store', '01/01/2020', '$350.00', 'Leave with Manager', 'Delivered'),
    createData(1006, 'ABC General Store', '01/01/2020', '$350.00', 'Leave with Manager', 'Delivered'),
    createData(1007, 'ABC General Store', '01/01/2020', '$350.00', 'Leave with Manager', 'Delivered'),
    createData(1008, 'ABC General Store', '01/01/2020', '$350.00', 'Leave with Manager', 'Delivered'),
    createData(1009, 'ABC General Store', '01/01/2020', '$350.00', 'Leave with Manager', 'Delivered'),
    createData(1010, 'ABC General Store', '01/01/2020', '$350.00', 'Leave with Manager', 'Delivered'),
    createData(1011, 'ABC General Store', '01/01/2020', '$350.00', 'Leave with Manager', 'Delivered'),
    createData(1012, 'ABC General Store', '01/01/2020', '$350.00', 'Leave with Manager', 'Delivered'),
    createData(1013, 'ABC General Store', '01/01/2020', '$350.00', 'Leave with Manager', 'Delivered'),
    createData(1014, 'ABC General Store', '01/01/2020', '$350.00', 'Leave with Manager', 'Delivered'),
];

function createData(invoice, customer, date, amount, memo, status) {
    return { invoice, customer, date, amount, memo, status };
}

const useStyles = makeStyles((theme) => ({
    rootContainer: {
        margin: "20px 0"
    }
}));

const shopOptions = [
    {
        id: 1,
        name: 'ABC General Store',
        zone: "Kunj"
    }
];

const productOptions = [
    { id: 1, name: "Super Salted Crinkle-50", unitPrice: 45.00 },
    { id: 2, name: "Super Salted Crinkle-51", unitPrice: 45.00 },
    { id: 3, name: "Super Salted Crinkle-52", unitPrice: 45.00 },
];

const orderDetails = {
    id: 1001,
    date: "01/01/2020",
    shopId: 1140000,
    pic: "",
    shopName: "ABC General Store",
    street: "123 Main Street",
    city: "Anytown",
    providence: "NJ",
    zip: "07424",
    phone: "800-555-5555",
    email: null,
    orderItems: [
        { productName: "Super Salted Crinkle-50", productUnitPrice: 45.00, unitsOrdered: 8, productTotalCost: 45.00 }
    ],
    memo: ""
};

const Orders = () => {
    const classes =useStyles();
    const [showOrderForm, setOrderForm] = useState(false)
    const [loading, setLoading] = useState(false)

    const onFormShowHandler = () => {
        setOrderForm(true)
    }

    const onFormCloseHandler = () => {
        setOrderForm(false)
    }

    return (
        <WithSignedInSkeleton title={"Orders"}>
            {!loading ? (
                <>
                    <div className={classes.rootContainer}>
                        <Grid container spacing={3}>
                            <Grid item lg={9}>
                                <OrderTable
                                    rows={shopRows}
                                />
                            </Grid>
                            <Grid item lg={3} container direction={"column"} spacing={2}>
                                <div>
                                    <ShowAddOrderFormButton
                                        disable={showOrderForm}
                                        onClickHandler={onFormShowHandler}
                                        title={"Add New Order"}
                                    />
                                </div>
                                <div>
                                    <OrderStatus
                                        delivered={10}
                                        paid={0}
                                        pending={0}
                                        credit={1}

                                    />
                                </div>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item lg={9} xs={9}>
                                <OrderInfoPage details={orderDetails}></OrderInfoPage>
                            </Grid>
                        </Grid>
                    </div>
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