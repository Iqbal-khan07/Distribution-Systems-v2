import React from 'react';
import PropTypes from 'prop-types';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import GoogleButton from './components/GoogleButton';
import FacebookButton from './components/FacebookButton';
import { TextField } from 'formik-material-ui';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import Button from '@material-ui/core/Button';
import styles from './SignInDialogue.module.css';
import { useHistory } from "react-router-dom";

import * as Yup from "yup"
import {Formik, Form, Field} from "formik"
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EMAIL = 'userName';
const PASSWORD = 'password';

const validationSchema = Yup.object({
    [EMAIL]: Yup.string("Enter your email")
        .email("Enter a valid email")
        .required("Email is required"),
    [PASSWORD]: Yup.string("")
        .required("Password is required"),
})

export default function SignInDialogue({ onClose, open }) {

  let history = useHistory();
  return (
      <Formik
          initialValues={{
            [EMAIL]: '',
            [PASSWORD]: ''
          }}
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={validationSchema}
          onSubmit={async (values, {setSubmitting}) => {
            setSubmitting(true)
            const response = await axios.post('/user/authenticate/default', {
              authenticate_default: {
                username: values[EMAIL],
                password: values[PASSWORD]
              }
            })

            console.log(response)
            history.push("/shoptracker");
            setSubmitting(false)
          }}
          >
        {({submitForm, isSubmitting, touched, errors}) => (
            <Form>
              <Dialog
                onClose={onClose}
                open={open}
                TransitionComponent={Transition}
                maxWidth="xs"
                fullWidth
              >
                 <DialogTitle
                     className={styles.dialogue}
                     disable
                     Typography
                 >
                   Sign In
                 </DialogTitle>
                <DialogContent className={styles.container} component="main">
                  <Grid className={styles.oauthButton}>
                    <GoogleButton />
                  </Grid>
                  <Grid className={styles.oauthButton}>
                    <FacebookButton />
                  </Grid>
                     <Field
                         error={errors[EMAIL] && touched[PASSWORD]}
                         component={TextField}
                         type={"email"}
                         name={EMAIL}
                         label="Email"
                         variant="outlined"
                         margin="normal"
                         required
                         fullWidth
                         autoComplete="email"
                         InputProps={{
                            startAdornment:
                              (<InputAdornment position="start">
                                <AccountCircle />
                              </InputAdornment>),
                          }}
                    />
                    <Field
                      error={errors[PASSWORD] && touched[PASSWORD]}
                      component={TextField}
                      label="Password"
                      name={PASSWORD}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      type={"password"}
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
                      <Button
                          className={styles.loginButton}
                          disabled={isSubmitting}
                          onClick={submitForm}
                          type="submit"
                      >
                        Log In
                      </Button>
                      <Grid item>
                        <Link href="#" variant="body2" className={styles.link}>
                          {"Don't have an account? Sign Up"}
                        </Link>
                      </Grid>
                    </div>
                </DialogContent>
              </Dialog>
            </Form>
            )}
      </Formik>
  );
}

SignInDialogue.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};