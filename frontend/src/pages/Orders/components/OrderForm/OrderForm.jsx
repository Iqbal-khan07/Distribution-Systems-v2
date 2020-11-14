import React from "react";
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

import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker } from 'formik-material-ui-pickers';
import MuiTextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#e5e4e4',
    },
    paper_root: {
        padding: "15px",
        height: "70%",
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
    submitButton: {
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
    title: {
        display: "inline",
        color: "#5DB285",
        fontSize: '2rem',
        fontWeight: "bold"
    },
    // shop select
    formControl: {
        margin: theme.spacing(1),
        maxWidth: 300,
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
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 300
    },

}));


const DELIVERY_DATE = 'deliveryDate'
const SELECTED_SHOP = 'shop'
const PRODUCT_QUANTITY = 'products'
const MEMO = 'memo'

const validationSchema = Yup.object({
    // name: Yup.string("Enter a name")
    //     .required("Name is required"),
    // email: Yup.string("Enter your email")
    //     .email("Enter a valid email")
    //     .required("Email is required"),
    // password: Yup.string("")
    //     .min(8, "Password must contain at least 8 characters")
    //     .required("Enter your password"),
    // confirmPassword: Yup.string("Enter your password")
    //     .required("Confirm your password")
    //     .oneOf([Yup.ref("password")], "Password does not match")
})

const initializeProductQuantity = (products) => {
    let productsQuantityObject = {}
    for(let i=0; i < products.length; i++){
        productsQuantityObject[products[i].id] = 0
    }
    return productsQuantityObject
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
            onSubmit={(values, {setSubmitting, resetForm}) => {
                  setTimeout(() => {
                    setSubmitting(false);
                    resetForm()
                    alert(JSON.stringify(values, null, 2));
                  }, 500);
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
                                <div className={classes.form_container}>
                                    {shopSelect}
                                    <br />
                                    {dateSelect}
                                    <br />
                                    <br />
                                    <OrderProductTable
                                        products={products}
                                        value={values[PRODUCT_QUANTITY]}
                                        name={PRODUCT_QUANTITY}
                                    />
                                    <br />
                                    {memo}
                                    <br />
                                </div>
                                <div style={{position: 'absolute', width: "100%", bottom: 10}}>
                                    <Button
                                        className={classes.submitButton}
                                        disabled={isSubmitting}
                                        onClick={submitForm}
                                    >
                                        Place Order
                                    </Button>
                                </div>
                            </Form>
                        </MuiPickersUtilsProvider>
                    </Paper>
                </Backdrop>
            )}
        </Formik>
    )
}