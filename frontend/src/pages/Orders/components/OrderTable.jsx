import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme , withStyles, StylesProvider} from '@material-ui/core/styles';
import {TableContainer, Table, TableHead, TableBody, TableCell, TableFooter, 
    TablePagination, TableRow, Paper, IconButton, Toolbar, Typography} from '@material-ui/core';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import InfoIcon from '@material-ui/icons/Info';
import styles from './OrderTable.module.css';

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));
  
  function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(invoice, customer, date, amount, memo, status) {
  return { invoice, customer, date, amount, memo, status };
}

const rows = [
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
].sort((a, b) => (a.id < b.id ? -1 : 1));

export default function OrderTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  
  return (
      <StylesProvider injectFirst>
    <TableContainer component={Paper}>
        <Toolbar>
            <Typography variant="h6" className={styles.title}>
                Order List
            </Typography>
        </Toolbar>
        <Table className={styles.table} size="small" aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell className={styles.tableHeader}>Invoice No.</TableCell>
            <TableCell className={styles.tableHeader}>Customer</TableCell>
            <TableCell className={styles.tableHeader}>Date</TableCell>
            <TableCell className={styles.tableHeader}>Amount</TableCell>
            <TableCell className={styles.tableHeader}>Memo</TableCell>
            <TableCell className={styles.tableHeader}>Status</TableCell>
            <TableCell className={styles.tableHeader} align="center">Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <StyledTableRow key={row.id}>
              <TableCell>
                {row.invoice}
              </TableCell>
              <TableCell>
                {row.customer}
              </TableCell>
              <TableCell>
                {row.date}
              </TableCell>
              <TableCell>
                {row.amount}
              </TableCell>
              <TableCell>
                {row.memo}
              </TableCell>
              <TableCell>
                {row.status}
              </TableCell>
              <TableCell align="center">
                <IconButton aria-label="get info">
                    <InfoIcon />
                </IconButton>
              </TableCell>
            </StyledTableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10]}
              colSpan={4}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    </StylesProvider>
  );
}
