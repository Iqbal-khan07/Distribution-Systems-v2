import React, { useContext } from "react";
import axios from "axios";
import { ERROR, SUCCESSFUL } from "../../../../constants/NOTIFICATION_TYPES";
import { NotificationContext } from "../../../../context/NotificationContext";
import Card from "@material-ui/core/Card";
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import * as Yup from "yup";


const useStyles = makeStyles((theme) => ({
    paper_root: {
        minWidth: '200px',
        maxWidth: '300px',
        minHeight: '100%',
    },
    title: {
        color: "#5DB285",
    },

    formField: {
        marginBottom: 5,
    },
    actions: {
        justifyContent: "center",
    },
    name: {
        paddingTop: theme.spacing(2),
        color: "#5DB285",
        fontWeight: "bold",
    },
    submitButton: {
        backgroundColor: "#5DB285",
        color: "#e5e4e4",
        borderRadius: 40,
        '&:hover': {
            backgroundColor: "#82e2b9",
            color: "#e5e4e4"
        }
    },

}));

const ID = 'id';
const GOAL = 'goal';

const validationSchema = Yup.object({
    [ID]: Yup.number().required('Id # is required'),
    [GOAL]: Yup.number().required('Goal is required').min(0, 'Must be positive'),
})

export default function SetGoalForm({ reload, id, name }) {
    const classes = useStyles();
    const { setANotification } = useContext(NotificationContext);

    return (
        <Formik
            initialValues={{
                [ID]: id,
                [GOAL]: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
                setSubmitting(true);
                await axios.post('/create/goal/order_taker', {
                    data: {
                        order_taker_id: values[ID],
                        goal_total: values[GOAL],
                    }
                })
                .then( () => {
                    setANotification(`Monthly goal for ${name} has been set successfully!`, SUCCESSFUL);
                    reload();
                    setSubmitting(false);
                    resetForm();  
                })
                .catch (error => {
                    let detailMessage = "";
                    if (error.response) {
                        detailMessage = error.response.data;
                    }
                    setANotification(`Failed to set the monthly goal! ${detailMessage}`, ERROR);
                });
            }}
        >
            {({ submitForm, isSubmitting, touched, errors, values }) => (
                <Card raised className={classes.paper_root}>
                    <CardContent>
                        <Grid container justify="center">
                            <Grid item xs={12}>
                                <Typography className={classes.title} variant={"h5"} align="center">
                                    Set Order Goal <br></br> For this Month
                                </Typography>
                            </Grid>
                            <Form style={{ width: 600 }}>
                                <Grid item align="center" xs={12}>
                                    <Field
                                        error={errors[ID] && touched[ID]}
                                        component={TextField}
                                        type="number"
                                        name={ID}
                                        label="Id"
                                        className={classes.formField}
                                        value={id}
                                        required
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item align="center" xs={12}>
                                    <Field
                                        error={errors[GOAL] && touched[GOAL]}
                                        component={TextField}
                                        type="number"
                                        name={GOAL}
                                        label="Goal"
                                        className={classes.formField}
                                        required
                                        disabled={isSubmitting}
                                        min={0}
                                        inputProps={{
                                            min: 0,
                                            step: 100,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography className={classes.name} variant="h6" align="center">
                                        {name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                </Grid>
                            </Form>
                        </Grid>

                    </CardContent>
                    <CardActions className={classes.actions}>
                        <Button
                            className={classes.submitButton}
                            disabled={isSubmitting}
                            onClick={submitForm}
                        >
                            Set Goal
                        </Button>

                    </CardActions>
                </Card>
            )}
        </Formik>
    );
}