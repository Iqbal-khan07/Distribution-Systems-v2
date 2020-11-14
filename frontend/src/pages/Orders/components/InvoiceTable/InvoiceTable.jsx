import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DataDisplayUtils from "../../../../utils/DataDisplayUtils";


const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 700,

    },
    head: {
        backgroundColor: "#232E33",
        color: "#FFFFFF",
    },
    total: {
        fontWeight: "bold",
        color: "#5DB285",
        paddingBottom: theme.spacing(10),
    },
    memo: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(5),
    },
}));


export default function InvoiceTable({ orderItems }) {
    const priceRow = (qty, unit) => (qty * unit);

    function createRow(desc, qty, unit) {
        const price = priceRow(qty, unit);
        return { desc, qty, unit, price };
    }

    function subtotal(items) {
        return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
    }

    const rows = orderItems.map((item) => {
        return createRow(item.productName, item.unitsOrdered, item.productUnitPrice);
    })

    const invoiceSubtotal = subtotal(rows);
    const deliveryFee = 0;
    const invoiceTotal = deliveryFee + invoiceSubtotal;
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="Invoice table">
                <TableHead className={classes.head}>
                    <TableRow>
                        <TableCell className={classes.head}>Description</TableCell>
                        <TableCell className={classes.head} align="right">Unit Price</TableCell>
                        <TableCell className={classes.head} align="right">Qty.</TableCell>
                        <TableCell className={classes.head} align="right">Sum</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.desc}>
                            <TableCell>{row.desc}</TableCell>
                            <TableCell align="right">{DataDisplayUtils.displayMoneyValue(row.unit)}</TableCell>
                            <TableCell align="right">{row.qty}</TableCell>
                            <TableCell align="right">{DataDisplayUtils.displayMoneyValue(row.price)}</TableCell>
                        </TableRow>
                    ))}

                    <TableRow>
                        <TableCell rowSpan={3} colSpan={2} />
                        <TableCell>Subtotal</TableCell>
                        <TableCell align="right">{DataDisplayUtils.displayMoneyValue(invoiceSubtotal)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Delivery Fee</TableCell>
                        <TableCell align="right">{DataDisplayUtils.displayMoneyValue(deliveryFee)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.total}>Grand Total</TableCell>
                        <TableCell align="right" className={classes.total}>{DataDisplayUtils.displayMoneyValue(invoiceTotal)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={4} className={classes.memo}>
                            <b>Memo: </b>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}