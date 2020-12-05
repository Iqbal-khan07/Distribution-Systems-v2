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
import { useHistory } from "react-router-dom";

import * as Yup from "yup"
import {Formik, Form, Field} from "formik"
import axios from 'axios';
import {UserContext} from "../../context/UserContext";
import {Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    dialogue: {
        textAlign: 'center',
        color: '#5DB285',
        fontSize: '25px'
    },
    container: {
        paddingTop: '24px',
        paddingBottom: '24px',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column'
    },
    center:{
        width: '100%',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },

    oauthButton: {
        marginBottom: '20px'
    },

    loginButton: {
        color: 'rgb(255, 255, 255, 0.7)',
        background: '#5DB285',
        paddingRight: '15px',
        paddingLeft: '15px',
        borderRadius: '15px',
        margin: '10px',
        '&:hover': {
            background: '#427C5D'   
        }
    },
    link: {
        color: '#5DB285',
        '&:hover': {
            color: '#427C5D'
        }
    }
}))




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
    const classes = useStyles();
    const { login } = useContext(UserContext);
    const [ error, setError ] = useState(false)
    let history = useHistory();

    const handleLogin = (id, image_url, name_first, name_last, sys_user_role) => {
        login(id, image_url, `${name_first} ${name_last}`, sys_user_role.name)
        history.push("/dashboard");
    }
    
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
                  console.log(response)
                  const body = response.data;
                  if(response.status === 200){
                      const {
                          id, name_first, name_last, sys_user_role, image_url
                      } = body.data;
                      handleLogin(id, image_url, name_first, name_last, sys_user_role)
                  }
              }catch (e) {
                  setError(true)
                  resetForm()
              }finally {
                  setSubmitting(false)
                  resetForm()
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
                         className={classes.dialogue}
                         disable
                         Typography
                     >
                       Sign In
                     </DialogTitle>
                    <DialogContent className={classes.container} component="main">
                      <Grid className={classes.oauthButton}>
                        <GoogleButton
                            setError={setError}
                            loginHandler={handleLogin}
                        />
                      </Grid>
                      <Grid className={classes.oauthButton}>
                        <FacebookButton
                            setError={setError}
                            loginHandler={handleLogin}
                         />
                      </Grid>
                        {error ? (
                            <Typography color={"error"}>Wrong Credentials</Typography>
                        ): null}
                         <Field
                             error={errors[EMAIL] && touched[EMAIL]}
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
                        <div className={classes.center}>
                          <Grid item xs>
                            <Link href="#" variant="body2" className={classes.link}>
                              Forgot password?
                            </Link>
                          </Grid>
                          <Button
                              className={classes.loginButton}
                              disabled={isSubmitting}
                              onClick={submitForm}
                              type="submit"
                          >
                            Log In
                          </Button>
                          <Grid item>
                            <Link href="#" variant="body2" className={classes.link}>
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