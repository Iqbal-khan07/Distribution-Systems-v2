import React, {useContext, useEffect, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import axios from 'axios'
import * as Yup from "yup"
import { Formik, Form, Field } from "formik"

import Backdrop from "@material-ui/core/Backdrop";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker } from 'formik-material-ui-pickers';

import ShopSelect from "./components/ShopSelect/ShopSelect";
import PaymentMethodSelect from "./components/PaymentMethodSelect/PaymentMethodSelect";
import MultiLineInput from "../../../../shared/MultiLineInput/MultiLineInput";
import OrderProductTable from "./components/OrderProductTable/OrderProductTable";

import { UserContext } from "../../../../context/UserContext";
import { NotificationContext } from "../../../../context/NotificationContext";
import { ERROR, SUCCESSFUL } from "../../../../constants/NOTIFICATION_TYPES";
import PaymentMethods from "../../../../constants/PAYMENT_METHODS";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#e5e4e4',
    },
    paper_root: {
        padding: "15px",
        margin: "100px auto",
        textAlign: "center",
        backgroundColor: "#ffffff",
        position: "relative",
        borderRadius: 30
    },

    form_container: {
        display: "flex",
        flexDirection: "column",
        alignContent: "flex-start",
        minHeight: "200px",
        maxHeight: "200px",

    },
    holder: {
        marginBottom: theme.spacing(1)
    },

    button: {
        backgroundColor: "#5DB285",
        color: "#e5e4e4",
        position: "absolute",
        right: 20,
        '&:hover': {
            backgroundColor: "#82e2b9",
            color: "#e5e4e4"
        }
    },
    title: {
        display: "inline",
        color: "#5DB285",
        fontSize: '2rem',
        fontWeight: "bold"
    },
    // date select
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        margin: theme.spacing(1),
        marginBottom: theme.spacing(3),
        marginRight: '100%',
        width: 170
    },

    submitButton: {
        marginTop: theme.spacing(3),
        backgroundColor: "#5DB285",
        color: "#e5e4e4",
        width: 170,
        borderRadius: 40,
        right: 20,
        margin: '0 auto',
        '&:hover': {
            backgroundColor: "#82e2b9",
            color: "#e5e4e4"
        }

    },

}));

const DELIVERY_DATE = 'deliveryDate'
const SELECTED_SHOP = 'shop'
const METHOD = 'method'
const PRODUCT_QUANTITY = 'products'
const MEMO = 'memo'


const validationSchema = Yup.object({
    [SELECTED_SHOP]: Yup.number().required()
})

const initializeProductQuantity = (products) => {
    let productsQuantityObject = {}
    for (let i = 0; i < products.length; i++) {
        productsQuantityObject[products[i].id] = 0
    }
    return productsQuantityObject
}

const convertToAPIProductQuantity = (input) => {
    const keys = Object.keys(input);
    const output = []
    for (let i = 0; i < keys.length; i++) {
        if (input[keys[i]] > 0) {
            output.push({
                id: Number(keys[i]),
                quantity_units: input[keys[i]]
            })
        }
    }
    return output;
}

const areInventoriesEqual = (inventory1, inventory2) => {
    const key1 = Object.keys(inventory1);
    const key2 = Object.keys(inventory2);
    if (key1.length !== key2.length) return false;

    for(let i=0; i < key1.length; i++){
        if(inventory2[key1[i]] !== inventory1[key1[i]]) {
            return false;
        }
    }
    return true;
}

const initializeItemQuantity = (products) => {
    const itemNumbers = {}
    for (let i=0; i < products.length; i++){
        itemNumbers[products[i].id] = 0
    }
    return itemNumbers;
}

const setDateInAdvanceBy =  (days) => {
    return new Date(Date.now() + (days * 24 * 3600 * 1000))
}

export default function OrderForm({ showForm, onCloseButtonHandler, products, shops, initialInventory, reload }) {
    const classes = useStyles();
    const { user } = useContext(UserContext);
    const { setANotification } = useContext(NotificationContext)
    const [inventory, setInventory] = useState(initialInventory);
    const [itemsQuantity, setItemsQuantity] = useState(initializeItemQuantity(products));

    useEffect(() => {
        const timer = setInterval(async () => {
            const response = await axios.get('/inventory');
            const body = response.data.data;

            const newInventory = {}
            for (let i=0; i < body.length; i++) {
                newInventory[body[i].id] = body[i].stock;
            }
            console.log('updating')
            setInventory((prevInventory) => {
                if(!areInventoriesEqual(newInventory, inventory)){
                    return newInventory;
                }
                return prevInventory;
            });
        }, 5000);

        return () => clearTimeout(timer);
    }, [inventory])

    const handleItemQuantityChange = (productId, change) => {
        setItemsQuantity((prevItems) => {
            prevItems[productId] += change;
            return {
                ...prevItems
            }
        })
    }

    const dateSelect = (
        <Field
            className={classes.textField}
            component={DatePicker}
            name={DELIVERY_DATE}
            label="Delivery Date"
        />
    )

    return (
        <Formik
            initialValues={{
                [SELECTED_SHOP]: '',
                [DELIVERY_DATE]: setDateInAdvanceBy(7),
                [PRODUCT_QUANTITY]: initializeProductQuantity(products),
                [METHOD]: PaymentMethods.CASH_ON_DELIVERY,
                [MEMO]: ''
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
                setSubmitting(true)
                const differenceInDays = Math.ceil((values[DELIVERY_DATE].getTime() - Date.now()) / (1000 * 3600 * 24));
                try {
                    await axios.post('/create/shop_order', {
                        data: {
                            shop_id: values[SELECTED_SHOP],
                            price_paid: values[METHOD] === PaymentMethods.CASH,
                            deliver_days_from_today: differenceInDays,
                            memo: values[MEMO],
                            order_taker_id: user.id,
                            order_items: convertToAPIProductQuantity(values[PRODUCT_QUANTITY])
                        }
                    })
                    setANotification('Order Submitted Successfully', SUCCESSFUL)
                    setSubmitting(false)
                    reload()
                } catch (e) {
                    setANotification('Order Failed to submit! Please try again', ERROR)
                } finally {
                    resetForm()
                    onCloseButtonHandler()
                }
            }}
        >
            {({ submitForm, isSubmitting, touched, errors, values }) => (
                <Backdrop className={classes.backdrop} open={showForm} >
                    <Paper className={classes.paper_root}>
                        <div>
                            <Typography className={classes.title} variant={"h6"}>Order</Typography>
                            <Fab
                                color="primary"
                                className={classes.button}
                                size={"small"}
                                variant={"extended"}
                                onClick={onCloseButtonHandler}
                            >
                                <span>X</span>
                            </Fab>
                        </div>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Form>
                                <Grid container direction={"column"}>
                                    <Grid container item direction={"row"} spacing={10}>
                                        <Grid item>
                                            <Grid item>
                                                <ShopSelect
                                                    shops={shops}
                                                    width={250}
                                                    name={SELECTED_SHOP}
                                                />
                                            </Grid>
                                            <Grid item>
                                                {dateSelect}
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                            <PaymentMethodSelect
                                                methods={Object.values(PaymentMethods)}
                                                width={250}
                                                name={METHOD}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <OrderProductTable
                                            products={products}
                                            inventory={inventory}
                                            value={values[PRODUCT_QUANTITY]}
                                            name={PRODUCT_QUANTITY}
                                            itemsQuantity={itemsQuantity}
                                            updateItemQuantity={handleItemQuantityChange}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <MultiLineInput
                                            name={MEMO}
                                            rows={2}
                                            placeholder={'Memo'}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            className={classes.submitButton}
                                            disabled={isSubmitting}
                                            onClick={submitForm}
                                        >
                                            Place Order
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Form>
                        </MuiPickersUtilsProvider>
                    </Paper>
                </Backdrop>
            )}
        </Formik>
    )
}