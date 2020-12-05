import React, {useContext} from "react";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Toolbar,
    Typography
} from "@material-ui/core";
import styles from "../../../ShopTracker/components/ShopTable/ShopTable.module.css";
import EditIcon from '@material-ui/icons/Edit';
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import DataDisplayUtils from '../../../../utils/DataDisplayUtils'
import {Formik} from "formik";
import * as Yup from "yup";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import {ERROR, SUCCESSFUL} from "../../../../constants/NOTIFICATION_TYPES";
import {NotificationContext} from "../../../../context/NotificationContext";
import {SUPER_USER} from "../../../../constants/ROLES";


const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
    toolbar: {
        display: "flex"
    },
    toolbarButton: {
        backgroundColor: "#5DB285",
        borderRadius: 20,
        '&:hover': {
            backgroundColor: "#427C5D",
            color: "#e5e4e4"
        },
        '&:disabled': {
            backgroundColor: "#63ba89",
            color: "#e5e4e4",
            opacity: 0.5
        },
    },
    productImage: {
        height: 60,
        width: 55
    }
}))

const makeStockCell = (stock) => {
    if(stock > 0){
        return <span><Typography variant={"caption"} style={{color: '#3bc230'}}>in stock</Typography>({stock})</span>
    }else {
        return <span><Typography variant={"caption"} style={{color: '#e91717'}}>out of stock</Typography></span>
    }
}

const initializeFormikValues = (inventory) => {
    const initial = {}
    for (let i=0; i < inventory.length; i++ ){
        initial[String(inventory[i].id)] = inventory[i].stock
    }
    return initial
}

const makeValidationSchema = (inventory) => {
    const schema = {};
    for (let i=0; i < inventory.length; i++ ){
        schema[String(inventory[i].id)] = Yup.number().min(0, "Value should be greater than zero").required()
    }
    return Yup.object(schema);
}

const didInventoryChange = (values, inventory) => {
    const productIds = Object.keys(values);
    for(let i=0; i < productIds.length; i++){
        if (values[productIds[i]] - inventory.find((p) => p.id === Number(productIds[i])).stock !== 0) {
            return true
        }
    }
    return false
}

export default function InventoryTable({inventory, onAddNewProduct, reload, role}) {
    const classes = useStyles();
    const { setANotification } = useContext(NotificationContext)

    inventory = inventory.sort((a, b) => (a.id < b.id ? -1 : 1))

    return (
        <Formik
                initialValues={initializeFormikValues(inventory)}
                validationSchema={makeValidationSchema(inventory)}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                    if(didInventoryChange(values, inventory)){
                        setSubmitting(true)
                        try {
                            const postData = []
                            const productIds = Object.keys(values);
                            for(let i=0; i < productIds.length; i++){
                                postData.push({
                                    company_product_id: Number(productIds[i]),
                                    stock_delta: values[productIds[i]] - inventory.find((p) => p.id === Number(productIds[i])).stock
                                })
                            }
                            await axios.post('/inventory/update', {
                                data: postData
                            })
                            setANotification('Inventory Updated Successfully', SUCCESSFUL)
                            setSubmitting(false)
                            reload()
                        }catch (e){
                            resetForm(initializeFormikValues(inventory))
                            setANotification('Failed to Update Inventory! Please try again', ERROR)
                        }
                    }
                }}
            >
                {({ submitForm, isSubmitting, touched, errors, values , handleChange}) => (
                    <TableContainer component={Paper}>
                            <Toolbar className={classes.toolbar}>
                                <div>
                                    <Typography variant="h4" className={styles.title}>
                                        Inventory
                                    </Typography>
                                </div>
                                <div style={{flexGrow: 1}}/>
                                {role === SUPER_USER ? (
                                    <div>
                                        <Button
                                            className={classes.toolbarButton}
                                            style={{marginRight: 50}}
                                            onClick={onAddNewProduct}
                                        >
                                            Add a New Product
                                        </Button>
                                        <Button
                                            className={classes.toolbarButton}
                                            onClick={submitForm}
                                        >
                                            Save Stock Changes
                                        </Button>
                                    </div>
                                ): null}
                        </Toolbar>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell className={styles.tableHeader}>Id</TableCell>
                                    <TableCell className={styles.tableHeader}>Name</TableCell>
                                    <TableCell className={styles.tableHeader}>Image</TableCell>
                                    <TableCell className={styles.tableHeader}>Description</TableCell>
                                    <TableCell className={styles.tableHeader}>Stock</TableCell>
                                    <TableCell className={styles.tableHeader}>Buying Price</TableCell>
                                    <TableCell className={styles.tableHeader}>Selling Price</TableCell>
                                    {role === SUPER_USER ? (
                                        <>
                                            <TableCell className={styles.tableHeader}>Update Stock</TableCell>
                                            <TableCell className={styles.tableHeader}>Options</TableCell>
                                        </>
                                    ): null}
                              </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    inventory.map((product) => (
                                        <StyledTableRow key={product.id}>
                                            <TableCell>
                                                {product.id}
                                            </TableCell>
                                            <TableCell>
                                                <Typography><b>{product.name}</b></Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Avatar variant="square" src={product.imageUrl} className={classes.productImage} />
                                            </TableCell>
                                            <TableCell>
                                                {product.description}
                                            </TableCell>
                                            <TableCell>
                                                {makeStockCell(product.stock)}
                                            </TableCell>
                                            <TableCell>
                                                {DataDisplayUtils.displayMoneyValue(product.buyingPrice)}
                                            </TableCell>
                                            <TableCell>
                                                {DataDisplayUtils.displayMoneyValue(product.sellingPrice)}
                                            </TableCell>
                                            {role === SUPER_USER ? (
                                                <>
                                                <TableCell>
                                                    <TextField
                                                        error={errors[String(product.id)] && touched[String(product.id)]}
                                                        name={String(product.id)}
                                                        value={values[String(product.id)]}
                                                        style={{width: 60}}
                                                        onChange={handleChange}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <IconButton aria-label="get edit">
                                                        <EditIcon />
                                                    </IconButton>
                                                </TableCell>
                                                </>
                                            ): null}
                                        </StyledTableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
        </Formik>
  );
}

