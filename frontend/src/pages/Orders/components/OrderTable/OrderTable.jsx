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
import clsx from "clsx";
import DataDisplayUtils from "../../../../utils/DataDisplayUtils";

const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
    delivered: {
        backgroundColor: "#5DB285"
    },
    pending: {
        backgroundColor: "#FB7373"
    },
    paid: {
        backgroundColor: "#F6E337"
    },
    credit: {
        backgroundColor: "#BFD7DC"
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

export default function OrderTable({rows, orderShowDetailHandler}) {
  const classes = useStyles1()
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  rows = rows.sort((a, b) => (a.id < b.id ? -1 : 1))
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
    <TableContainer component={Paper} className={styles.tableContainer}>
        <Toolbar>
            <Typography variant="h6" className={styles.title}>
                Order List
            </Typography>
        </Toolbar>
        <Table className={styles.table} size="small">
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
                {row.id}
              </TableCell>
              <TableCell>
                {row.customer}
              </TableCell>
              <TableCell>
                {row.date}
              </TableCell>
              <TableCell>
                {DataDisplayUtils.displayMoneyValue(row.amount)}
              </TableCell>
              <TableCell>
                {row.memo}
              </TableCell>
              <TableCell>
                  <span
                    className={clsx({
                        [classes.delivered]: row.status.toLowerCase() === 'delivered',
                        [classes.paid]: row.status.toLowerCase() === 'paid',
                        [classes.pending]: row.status.toLowerCase() === 'pending',
                        [classes.credit]: row.status.toLowerCase() === 'credit',
                    })}
                  >{row.status}</span>
              </TableCell>
              <TableCell align="center">
                <IconButton aria-label="get info" onClick={() => orderShowDetailHandler(row.id)}>
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
              colSpan={10}
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
