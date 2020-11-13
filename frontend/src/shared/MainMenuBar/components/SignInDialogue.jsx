import React from 'react';
import PropTypes from 'prop-types';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import GoogleButton from './GoogleButton';
import FacebookButton from './FacebookButton';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import Button from '@material-ui/core/Button';
import styles from './SignInDialogue.module.css';
import { useHistory } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SignInDialogue(props) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };
  let history = useHistory();

  const submitHandler = (event) => {
    event.preventDefault();
    let username = document.getElementById("Email");
    let password = document.getElementById("Password");
    var xhr = new XMLHttpRequest()
    xhr.addEventListener("load", () => {
      console.log(xhr.responseText)
    })
    //xhr.open('POST', 'https://')
    //xhr.send(JSON.stringify({"authenticate_default":{"username":username.value, "password":password.value}}))
    username.value="";
    password.value="";
    history.push("/shoptracker");
  }
  

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      TransitionComponent={Transition}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle
        id="simple-dialog-title"
        className={styles.dialogue}
        disableTypography>
        Sign In
      </DialogTitle>
      <DialogContent className={styles.container} component="main">
        <Grid className={styles.oauthButton}>
          <GoogleButton />
        </Grid>
        <Grid className={styles.oauthButton}>
          <FacebookButton />
        </Grid>
        <form onSubmit={submitHandler}>
          <TextField
            id="Email"
            label="Email"
            variant="outlined"
            margin="normal"
            required fullWidth
            autoComplete="email"
            InputProps={{
              startAdornment:
                (<InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>),
            }}
          />
          <TextField
            id="Password"
            label="Password"
            variant="outlined"
            margin="normal"
            required fullWidth
            type="password"
            autoComplete="current-password"
            InputProps={{
              startAdornment:
                (<InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>),
            }}
          />
          <div className={styles.center}>
            <Grid item xs>
              <Link href="#" variant="body2" className={styles.link}>
                Forgot password?
              </Link>
            </Grid>
            <Button className={styles.loginButton} type="submit">
              Log In
            </Button>
            <Grid item>
              <Link href="#" variant="body2" className={styles.link}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

SignInDialogue.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};