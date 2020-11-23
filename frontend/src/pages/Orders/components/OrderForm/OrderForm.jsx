import React, {useContext} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Backdrop from "@material-ui/core/Backdrop";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";

import OrderProductTable from "../OrderProductTable/OrderProductTable";
import {Button} from "@material-ui/core";

import * as Yup from "yup"
import {Formik, Form, Field} from "formik"
import { TextField, fieldToTextField } from 'formik-material-ui'
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";

import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker } from 'formik-material-ui-pickers';
import MuiTextField from '@material-ui/core/TextField';

import axios from 'axios'
import {UserContext} from "../../../../context/UserContext";
import {NotificationContext} from "../../../../context/NotificationContext";
import {ERROR, SUCCESSFUL} from "../../../../constants/NOTIFICATION_TYPES";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#e5e4e4',
    },
    paper_root: {
        padding: "15px",
        // height: "70%",
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
    // shop select
    formControl: {
        margin: theme.spacing(1),
        width: 300,
        marginRight: '100%'
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
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
        width: 300
    },
    //memo
    memo: {
        marginTop: theme.spacing(2),
        width: '100%'
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
const PRODUCT_QUANTITY = 'products'
const MEMO = 'memo'

const validationSchema = Yup.object({
    [SELECTED_SHOP]: Yup.number().required()
})

const initializeProductQuantity = (products) => {
    let productsQuantityObject = {}
    for(let i=0; i < products.length; i++){
        productsQuantityObject[products[i].id] = 0
    }
    return productsQuantityObject
}

const covertToAPIProductQuantity = (input) => {
    const keys = Object.keys(input);
    const output = []
    for(let i=0; i < keys.length; i++){
        output.push({
            id: Number(keys[i]),
            quantity_units: input[keys[i]]
        })
    }
    return output;
}

function multiLine(props){
    const { form: {setFieldValue}, field: {name},} = props;
    // eslint-disable-next-line react-hooks/rules-of-hooks
     const onChange = React.useCallback(
        (event) => {
          const {value} = event.target;
          setFieldValue(name, value);
        },
        [setFieldValue, name]
     );
     return <MuiTextField
         {...fieldToTextField(props)}
         onChange={onChange}
         rows={3}
         multiline
         variant="outlined"
     />;
}


export default function OrderForm({showForm, onCloseButtonHandler, products, shops}){
    const classes = useStyles();
    const {user} = useContext(UserContext);
    const { setANotification } = useContext(NotificationContext)

    const shopSelect = (
        <Field
            component={TextField}
            type="text"
            name={SELECTED_SHOP}
            label="Client*"
            select
            variant="standard"
            helperText="Select a Shop (Required)"
            margin="normal"
            InputLabelProps={{
                shrink: true,
            }}
            className={classes.formControl}
        >
            <MenuItem value="">
                <em>None</em>
            </MenuItem>
            {shops.map((shop) => (
                <MenuItem key={shop.id} value={shop.id}>{`${shop.name} ${shop.zone}`}</MenuItem>
            ))}
        </Field>
    )

    const dateSelect = (
        <Field
            className={classes.textField}
            component={DatePicker}
            name={DELIVERY_DATE}
            label="Delivery Date"
        />
    )

    const memo = (
        <Field
          component={multiLine}
          name={MEMO}
          type="test"
          label="Memo"
          className={classes.memo}

        />
    )

    return (
        <Formik
            initialValues={{
                [SELECTED_SHOP]: '',
                [DELIVERY_DATE]: new Date(),
                [PRODUCT_QUANTITY]: initializeProductQuantity(products),
                [MEMO]: ''
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, {setSubmitting, resetForm}) => {
                setSubmitting(true)
                resetForm()
                try {
                    await axios.post('/create/shop_order', {
                        data: {
                            shop_id: values[SELECTED_SHOP],
                            price_paid: false,
                            memo: values[MEMO],
                            order_taker_id: user.id,
                            order_items: covertToAPIProductQuantity(values[PRODUCT_QUANTITY])
                        }
                    })
                    setANotification('Order Submitted Successfully', SUCCESSFUL)
                    setSubmitting(false)
                }catch (e){
                    setANotification('Order Failed to submit! Please try again', ERROR)
                }finally {
                    onCloseButtonHandler()
                }
            }}
        >
            {({submitForm, isSubmitting, touched, errors, values}) => (
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
                                    <Grid container item direction={"column"}>
                                        <Grid>
                                            {shopSelect}
                                        </Grid>
                                        <Grid>
                                            {dateSelect}
                                        </Grid>
                                    </Grid>
                                    <Grid>
                                        <OrderProductTable
                                            products={products}
                                            value={values[PRODUCT_QUANTITY]}
                                            name={PRODUCT_QUANTITY}
                                        />
                                    </Grid>
                                    <Grid>
                                        {memo}
                                    </Grid>
                                    <Grid>
                                        <Grid>
                                            <Button
                                                className={classes.submitButton}
                                                disabled={isSubmitting}
                                                onClick={submitForm}
                                            >
                                                Place Order
                                            </Button>
                                        </Grid>
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