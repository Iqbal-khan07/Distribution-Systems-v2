import React, { useContext } from "react";
import axios from "axios";
import { ERROR, SUCCESSFUL } from "../../../../constants/NOTIFICATION_TYPES";

import Backdrop from "@material-ui/core/Backdrop";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Field, Form, Formik } from "formik";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import * as Yup from "yup";

import { NotificationContext } from "../../../../context/NotificationContext";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { TextField } from "formik-material-ui";
import Avatar from '@material-ui/core/Avatar';
import MenuItem from "@material-ui/core/MenuItem";


const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#e5e4e4',
    },
    paper_root: {
        padding: "30px",
        // height: "70%",
        margin: "100px auto",
        backgroundColor: "#ffffff",
        position: "relative",
        borderRadius: 20,
    },
    form_container: {
        display: "flex",
        flexDirection: "column",
        alignContent: "flex-start",
        minHeight: "200px",
        maxHeight: "200px",
    },
    holder: {
        marginBottom: theme.spacing(1)
    },
    button: {
        backgroundColor: "#5DB285",
        color: "#e5e4e4",
        position: "absolute",
        right: 20,
        '&:hover': {
            backgroundColor: "#82e2b9",
            color: "#e5e4e4"
        }
    },
    title: {
        display: "inline",
        color: "#5DB285",
        fontSize: '2rem',
        fontWeight: "bold"
    },
    // image
    cover: {
        borderRadius: 5,
        height: 200,
        width: 200,
    },

    // shop select
    categorySelect: {
        // margin: theme.spacing(1),
        width: '100%',
        // marginRight: '100%'
    },

    formField: {
        width: 280,
        marginBottom: 5,
        marginLeft: 10,
    },

    submitButton: {
        marginTop: theme.spacing(3),
        backgroundColor: "#5DB285",
        color: "#e5e4e4",
        width: 170,
        borderRadius: 40,
        margin: '0 auto',
        '&:hover': {
            backgroundColor: "#82e2b9",
            color: "#e5e4e4"
        }
    },

}));

const FIRST_NAME = 'first';
const LAST_NAME = 'last';
const IMAGE_URL = 'imageUrl';
const PHONE = 'phone';
const GMAIL = 'gmail';
const FACEBOOK_EMAIL = "facebook";
const ROLE = 'role;'

const VALID_PHONE_REGEX = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const validationSchema = Yup.object({
    [FIRST_NAME]: Yup.string().required('First name is required'),
    [LAST_NAME]: Yup.string().required('Last name is required'),
    [IMAGE_URL]: Yup.string().url('Enter a Valid Image Url'),
    [PHONE]: Yup.string().matches(VALID_PHONE_REGEX, "Add a valid phone number").required('Phone number is required'),
    [GMAIL]: Yup.string().email('Valid email is required'),
    [FACEBOOK_EMAIL]: Yup.string().email('Valid email is required'),
    [ROLE]: Yup.string("must be number").required("Please choose a role"),
})

export default function AddEmployeeForm({ showForm, onCloseButtonHandler, roles, reload }) {
    const classes = useStyles();
    const { setANotification } = useContext(NotificationContext);

    return (
        <Formik
            initialValues={{
                [FIRST_NAME]: '',
                [LAST_NAME]: '',
                [IMAGE_URL]: '',
                [PHONE]: '',
                [GMAIL]: '',
                [FACEBOOK_EMAIL]: '',
                [ROLE]: '',
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
                setSubmitting(true)
                try {
                    await axios.post('/create/employee', {
                        data: {
                            first_name: values[FIRST_NAME],
                            last_name: values[LAST_NAME],
                            image_url: values[IMAGE_URL],
                            phone_number: values[PHONE],
                            gmail: values[GMAIL],
                            facebook_email: values[FACEBOOK_EMAIL],
                            role: values[ROLE]
                        }
                    })
                    setANotification(`Employee added successfully!`, SUCCESSFUL);
                    reload();
                    setSubmitting(false)
                }catch (e){
                    setANotification('Failed to Add Employee! Please try again', ERROR)
                }finally {
                    resetForm()
                    onCloseButtonHandler()
                }
            }}
        >
            {({submitForm, isSubmitting, touched, errors, values}) => (
                <Backdrop className={classes.backdrop} open={showForm} >
                    <Paper className={classes.paper_root}>
                        <div style={{textAlign: 'center'}}>
                            <Typography className={classes.title} variant={"h6"}>Add an Employee</Typography>
                            <Fab
                                color="primary"
                                className={classes.button}
                                size={"small"}
                                variant={"extended"}
                                onClick={onCloseButtonHandler}
                            >
                                <span>X</span>
                            </Fab>
                        </div>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Form style={{width: 600}}>
                                <Grid container direction={"column"}>
                                    <Grid container direction={"row"}>
                                        <Grid item xs={4}>
                                            <Avatar variant="square" className={classes.cover} src={values[IMAGE_URL]} />
                                        </Grid>
                                        <Grid item direction={"column"} xs={7}>
                                            <Grid item>
                                                <Field
                                                     error={errors[FIRST_NAME] && touched[FIRST_NAME]}
                                                     component={TextField}
                                                     type="text"
                                                     name={FIRST_NAME}
                                                     label="First Name"
                                                     className={classes.formField}
                                                     required
                                                     style={{marginLeft: 30}}
                                                     // fullWidth

                                                />
                                            </Grid>
                                            <Grid item>
                                                <Field
                                                     error={errors[LAST_NAME] && touched[LAST_NAME]}
                                                     component={TextField}
                                                     type="text"
                                                     name={LAST_NAME}
                                                     label="Last Name"
                                                     className={classes.formField}
                                                     required
                                                     style={{marginLeft: 30}}
                                                     // fullWidth

                                                />
                                            </Grid>
                                            <Grid item>
                                                <Field
                                                     error={errors[IMAGE_URL] && touched[IMAGE_URL]}
                                                     component={TextField}
                                                     type={"text"}
                                                     name={IMAGE_URL}
                                                     label="Shop Image Url"
                                                     className={classes.formField}
                                                     style={{marginLeft: 30}}
                                                     // fullWidth
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    {/*/!*contact info*!/*/}
                                    <Grid item container direction={"row"} spacing={2}>
                                        <Grid item>
                                            <Field
                                                 error={errors[PHONE] && touched[PHONE]}
                                                 component={TextField}
                                                 type={"text"}
                                                 name={PHONE}
                                                 label="Phone"
                                                 className={classes.formField}
                                                 fullWidth
                                                 required
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Field
                                                 error={errors[GMAIL] && touched[GMAIL]}
                                                 component={TextField}
                                                 type={"text"}
                                                 name={GMAIL}
                                                 label="Gmail"
                                                 className={classes.formField}
                                                 fullWidth
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid item container direction={"row"} spacing={2}>
                                        <Grid item>
                                            <Field
                                                 error={errors[FACEBOOK_EMAIL] && touched[FACEBOOK_EMAIL]}
                                                 component={TextField}
                                                 type={"text"}
                                                 name={FACEBOOK_EMAIL}
                                                 label="Facebook Email"
                                                 className={classes.formField}
                                                 fullWidth
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Field
                                                component={TextField}
                                                type="text"
                                                name={ROLE}
                                                error={errors[ROLE] && touched[ROLE]}
                                                label="Role"
                                                select
                                                fullWidth
                                                required
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                className={classes.formField}
                                            >
                                                <MenuItem value="">
                                                    <em>none</em>
                                                </MenuItem>
                                                {roles.map((role) => (
                                                    <MenuItem key={role.id} value={role.id}>{role.role}</MenuItem>
                                                ))}
                                            </Field>
                                        </Grid>
                                    </Grid>


                                    {/*button*/}
                                    <Grid item container justify={"center"}>
                                        <Grid item>
                                            <Button
                                                className={classes.submitButton}
                                                disabled={isSubmitting}
                                                onClick={submitForm}
                                            >
                                                Add Employee
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Form>
                        </MuiPickersUtilsProvider>
                    </Paper>
                </Backdrop>
            )}
        </Formik>
    );
}