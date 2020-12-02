import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, Typography,
} from "@material-ui/core";
import { useFormikContext } from 'formik';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DataDisplayUtils from "../../../../../../utils/DataDisplayUtils";

const useStyles = makeStyles(() => ({
    table: {
        minWidth: 650,
        border: "1px solid",
        borderColor: "#534e4e",
        borderBottom: "0px solid",
        borderRadius: 10,
    },
    tableRowCell: {
        fontWeight: "bold",
        fontSize: "0.75rem",
        borderBottom: "1px solid",
        borderBottomColor: "#534e4e",
    },
    tableCell: {
        fontSize: "0.75rem",
        borderBottom: "1px solid black",
        borderBottomColor: "#534e4e",
    },
    noUnderLine: {
        borderBottom: "1px solid white",
    },
    valueButtonAdd: {
        backgroundColor: "#5DB285",
        marginLeft: 5,
        minWidth: 10,
        padding: 3,
        '&:hover': {
            backgroundColor: "#027211",
        }
    },
    valueButtonSubtract: {
        backgroundColor: "#FB7373",
        marginRight: 5,
        minWidth: 10,
        padding: 3,
        '&:hover': {
            backgroundColor: "#b60000",
        }

    },
    quantityHolder: {
        display: "inline-block",
        minWidth: 20
    },
    quantityNumber: {
        display: "inline",
        fontWeight: "bolder",
    },
    quantityIcon: {
        fontSize: 15
    }
}));

const calculateCurrentTotalValue = (unitPrice, quantity) => {
    return DataDisplayUtils.displayMoneyValue(unitPrice * quantity);
}

const displayQuantity = (quantity) => {
    if(quantity < 10){
        return "0"+quantity;
    }
    return quantity;
}

const calculateSubTotal = (products, values) => {
    let totalCost = 0;
    for(let i=0; i < products.length; i++){
        const unitCost = products[i].unitPrice;
        const quantity = values[products[i].id];
        totalCost += (unitCost * quantity);
    }
    return DataDisplayUtils.displayMoneyValue(totalCost);
}

export default function OrderProductTable({products, value, inventory, itemsQuantity, updateItemQuantity}) {
    const classes = useStyles();
    const { setValues } = useFormikContext();

    const increaseCount = (productId) => {
        setValues(({products, ...rest}) => {
            if(inventory[productId] + itemsQuantity[productId] > 0){
                products[productId] += 1
                updateItemQuantity(productId, -1);
            }
            return {
                products,
                ...rest
            };
        })
    }

    const decreaseCount = (productId) => {
        setValues(({products, ...rest}) => {
            if(products[productId] > 0){
                products[productId] -= 1
                updateItemQuantity(productId, 1);
            }
            return {
                products,
                ...rest
            };
        })
    }

    const makeQuantityField = (quantity, productId) => {
        return (
            <>
                <Button
                    className={classes.valueButtonSubtract}
                    onClick={() => {
                        decreaseCount(productId)
                    }}
                >
                    <RemoveIcon className={classes.quantityIcon}/>
                </Button>
                <span className={classes.quantityHolder}>
                    <Typography className={classes.quantityNumber}>{displayQuantity(quantity)}</Typography>
                </span>
                <Button
                    className={classes.valueButtonAdd}
                    onClick={() => {
                        increaseCount(productId)
                    }}
                >
                    <AddIcon className={classes.quantityIcon}/>
                </Button>
            </>
        )
    }


    return (
        <div>
            <TableContainer component={Paper} className={classes.table}>
              <Table size={"small"}>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.tableRowCell}>Products</TableCell>
                    <TableCell className={classes.tableRowCell} align="right">Unit Price(Rs)</TableCell>
                    <TableCell className={classes.tableRowCell} align="center">Quantity</TableCell>
                      <TableCell className={classes.tableRowCell} align="center">Available</TableCell>
                    <TableCell className={classes.tableRowCell} align="center">Total(Rs)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell className={classes.tableCell}>
                        {row.name}
                      </TableCell>
                      <TableCell className={classes.tableCell} align="right">
                          {DataDisplayUtils.displayMoneyValue(row.unitPrice)}
                      </TableCell>
                      <TableCell className={classes.tableCell} align="center">
                          {makeQuantityField(value[row.id], row.id)}
                      </TableCell>
                        <TableCell className={classes.tableCell} align={"center"}>
                            {inventory[row.id] + itemsQuantity[row.id]} units
                      </TableCell>
                      <TableCell className={classes.tableCell} align="center">
                          {calculateCurrentTotalValue(row.unitPrice, value[row.id])}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                      <TableCell className={classes.noUnderLine} colSpan={3} />
                      <TableCell className={classes.tableCell} colSpan={1}>Subtotal</TableCell>
                      <TableCell className={classes.tableCell} align="right">{calculateSubTotal(products, value)}</TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell className={classes.noUnderLine} colSpan={3} />
                      <TableCell className={classes.tableCell} colSpan={1}>Delivery Fee</TableCell>
                      <TableCell className={classes.tableCell} align="right">{DataDisplayUtils.displayMoneyValue(0)}</TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell className={classes.noUnderLine} colSpan={3} />
                      <TableCell className={classes.tableCell} colSpan={1}>Grand Total</TableCell>
                      <TableCell className={classes.tableCell} align="right">{calculateSubTotal(products, value)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
        </div>
    )
}