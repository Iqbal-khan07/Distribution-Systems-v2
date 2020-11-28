import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


export default function DeliveryConfirmationScreen(props) {
  const { orderNumber, open, onClose, handleDisabled } = props;
  const [confirmationAlertOpen, setConfirmationAlert] = React.useState(false);
  const [errorAlertOpen, setErrorAlert] = React.useState(false);
  const handleClose = () => {
    onClose();
  };
  const handleConfirmationAlert = () => {
    setConfirmationAlert(false);
  };
  const handleErrorAlert = () => {
    setErrorAlert(false);
  };

  const handleConfirmation = async () => {
    try {
      await axios.post('/deliver/shop_order', {
        data: {
          shop_order_id: { orderNumber },
          order_fulfiller_id: 0 // TODO - Get id from user context
        }
      });
      setConfirmationAlert(true);
      handleDisabled(true);
    }
    catch (e) {
      setErrorAlert(true);
    }
    finally {
      onClose();
    }
  };

  return (
    <div>
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
          <Button onClick={handleConfirmation} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={confirmationAlertOpen} autoHideDuration={5000} onClose={handleConfirmationAlert}>
        <MuiAlert elevation={6} variant="filled" onClose={handleConfirmationAlert} severity="success">
          Order delivery confirmed!
        </MuiAlert>
      </Snackbar>
      <Snackbar open={errorAlertOpen} autoHideDuration={5000} onClose={handleErrorAlert}>
        <MuiAlert elevation={6} variant="filled" onClose={handleErrorAlert} severity="error">
          Order delivery failed to confirm! Try again.
        </MuiAlert>
      </Snackbar>

    </div>
  );
}

DeliveryConfirmationScreen.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  orderNumber: PropTypes.number.isRequired,
};