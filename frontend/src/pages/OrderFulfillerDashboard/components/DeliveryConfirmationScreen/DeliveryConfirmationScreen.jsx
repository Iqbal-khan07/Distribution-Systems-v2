import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import {UserContext} from "../../../../context/UserContext";
import {NotificationContext} from "../../../../context/NotificationContext";
import {ERROR, SUCCESSFUL} from "../../../../constants/NOTIFICATION_TYPES";



export default function DeliveryConfirmationScreen(props) {
  const { orderNumber, open, onClose, handleDisabled } = props;
  const {user} = useContext(UserContext);
  const { setANotification } = useContext(NotificationContext)
  
  const handleClose = () => {
    onClose();
  };

  const handleConfirmation = async () => {
    console.log(orderNumber, user.id);
    try {
      await axios.post('/deliver/shop_order', {
        data: {
          shop_order_id: orderNumber,
          order_fulfiller_id: user.id
        }
      });
      setANotification(`Order # ${orderNumber} delivered successfully`, SUCCESSFUL)
      handleDisabled(true);
    }
    catch (e) {
      setANotification(`Failed to confirm delivery for order # ${orderNumber}. Please try again.`, ERROR)
    }
    finally {
      onClose();
    }
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
          <Button onClick={handleConfirmation} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
  );
}

DeliveryConfirmationScreen.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  orderNumber: PropTypes.number.isRequired,
};