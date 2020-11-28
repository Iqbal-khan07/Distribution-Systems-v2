import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';


export default function DeliveryConfirmationScreen(props) {
  /*const classes = useStyles();*/
  const { orderNumber, open, onClose, handleDisabled } = props;

  const handleClose = () => {
    onClose();
    handleDisabled(true);
  };

  return (
    <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">{"Confirm Delivery?"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Mark Order # {orderNumber} as delivered.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleClose} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DeliveryConfirmationScreen.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  orderNumber: PropTypes.string.isRequired,
};