import React, {useContext, useState} from 'react';
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
import styles from './SignInDialogue.module.css'
    ;
import { useHistory } from "react-router-dom";

import * as Yup from "yup"
import {Formik, Form, Field} from "formik"
import axios from 'axios';
import {UserContext} from "../../context/UserContext";
import {Typography} from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EMAIL = 'userName';
const PASSWORD = 'password';

const validationSchema = Yup.object({
    [EMAIL]: Yup.string("Enter your user name")
        .required("Username is required"),
    [PASSWORD]: Yup.string("")
        .required("Password is required"),
})

export default function SignInDialogue({ onClose, open }) {
    const { setName, setImageUrl, setId, setRole } = useContext(UserContext);
    const [ error, setError ] = useState(false)
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
          onSubmit={async (values, {setSubmitting, resetForm}) => {
              setSubmitting(true)
              try{
                  const response = await axios.post('/authenticate/default', {
                      data: {
                          username: values[EMAIL],
                          password: values[PASSWORD]
                      }
                  })
                  const body = response.data;
                  console.log(response)
                  if(response.status === 200){
                      const {
                          id, name_first, name_last, sys_user_role, image_url
                      } = body.data;
                      setId(id);
                      setImageUrl(image_url)
                      setName(`${name_first} ${name_last}`)
                      setRole(sys_user_role.name)
                      history.push("/dashboard");
                  }
              }catch (e) {
                  setError(true)
                  resetForm()
              }finally {
                  setSubmitting(false)
              }
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
                        <GoogleButton
                            setError={setError}
                        />
                      </Grid>
                      <Grid className={styles.oauthButton}>
                        <FacebookButton
                            setError={setError}
                         />
                      </Grid>
                        {error ? (
                            <Typography color={"error"}>Wrong Credentials</Typography>
                        ): null}
                         <Field
                             error={errors[EMAIL] && touched[PASSWORD]}
                             component={TextField}
                             type={"email"}
                             name={EMAIL}
                             label="user name"
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