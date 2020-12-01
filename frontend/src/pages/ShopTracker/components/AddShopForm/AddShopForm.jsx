import React, {useContext} from "react";
import axios from "axios";
import {ERROR, SUCCESSFUL} from "../../../../constants/NOTIFICATION_TYPES";

import Backdrop from "@material-ui/core/Backdrop";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {Field, Form, Formik} from "formik";
import Grid from "@material-ui/core/Grid";
import {Button} from "@material-ui/core";
import * as Yup from "yup";

import {NotificationContext} from "../../../../context/NotificationContext";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {TextField} from "formik-material-ui";
import CardMedia from "@material-ui/core/CardMedia";
import ImagePlaceholder from '../../../../assests/images/placeholder-image.png'
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
        backgroundColor: '#aba6a6',
        borderRadius: 5,
        height: 200,
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

const SHOP_NAME = 'name'
const CATEGORY = 'category'
const IMAGE_URL = 'imageUrl'
const PHONE = 'phone'
const EMAIL = 'email'
const STREET = 'street'
const PROVINCE = 'province'
const CITY = 'city'
const ZIP = 'zip'
const ZONE = 'zone'

const VALID_PHONE_REGEX = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const validationSchema = Yup.object({
    [SHOP_NAME]: Yup.string().required('name is required'),
    [CATEGORY]: Yup.string("must be number").required("Choose a category"),
    [IMAGE_URL]: Yup.string().url('Enter a Valid Image Url'),
    [PHONE]: Yup.string().matches(VALID_PHONE_REGEX, "Add a valid phone number").required('Phone number is required'),
    [EMAIL]: Yup.string().email('enter a valid email'),
    [STREET]: Yup.string().required("Required"),
    [CITY]: Yup.string().required("Required"),
    [PROVINCE]: Yup.string().required("Please Choose the Your Province"),
    [ZIP]: Yup.string("must be number").required("Please Enter Your Zip Code"),
    [ZONE]: Yup.string("must be number").required("Please Choose a Zone"),
})

export default function AddShopForm({showForm, onCloseButtonHandler, zones, categories, reload}) {
    const classes = useStyles();
    const { setANotification } = useContext(NotificationContext)

    return (
        <Formik
            initialValues={{
                [SHOP_NAME]: '',
                [CATEGORY]: '',
                [IMAGE_URL]: '',
                [PHONE]: '',
                [EMAIL]: '',
                [STREET]: '',
                [PROVINCE]: '',
                [CITY]: '',
                [ZIP]: '',
                [ZONE]: '',
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, {setSubmitting, resetForm}) => {
                setSubmitting(true)
                try {
                    await axios.post('/create/shop', {
                        data: {
                            name: values[SHOP_NAME],
                            email: values[EMAIL],
                            image_url: values[IMAGE_URL],
                            phone_number: values[PHONE],
                            category: values[CATEGORY],
                            street: values[STREET],
                            city: values[CITY],
                            providence: values[PROVINCE],
                            zip_4: values[ZIP],
                            zones: [
                                {
                                    id: values[ZONE]
                                }
                            ]
                        }
                    })
                    setANotification('Shop Added Successfully', SUCCESSFUL)
                    reload();
                    setSubmitting(false)
                }catch (e){
                    setANotification('Failed to Add Shop! Please try again', ERROR)
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
                            <Typography className={classes.title} variant={"h6"}>Add A Shop</Typography>
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
                                            <CardMedia
                                                className={classes.cover}
                                                image={ImagePlaceholder}
                                            />
                                        </Grid>
                                        <Grid item direction={"column"} xs={7}>
                                            <Grid item>
                                                <Field
                                                     error={errors[SHOP_NAME] && touched[SHOP_NAME]}
                                                     component={TextField}
                                                     type={"text"}
                                                     name={SHOP_NAME}
                                                     label="Shop Name"
                                                     className={classes.formField}
                                                     required
                                                     style={{marginLeft: 30}}
                                                     // fullWidth

                                                />
                                            </Grid>
                                            <Grid item>
                                                <Field
                                                    component={TextField}
                                                    type="text"
                                                    name={CATEGORY}
                                                    error={errors[CATEGORY] && touched[CATEGORY]}
                                                    label="Category"
                                                    select
                                                    // fullWidth
                                                    required
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    className={classes.formField}
                                                    style={{marginLeft: 30}}
                                                >
                                                    <MenuItem value="">
                                                        <em>none</em>
                                                    </MenuItem>
                                                    {categories.map((category) => (
                                                        <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                                                    ))}
                                                </Field>
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
                                                 error={errors[EMAIL] && touched[EMAIL]}
                                                 component={TextField}
                                                 type={"text"}
                                                 name={EMAIL}
                                                 label="Email"
                                                 className={classes.formField}
                                                 fullWidth
                                            />
                                        </Grid>
                                    </Grid>

                                    {/*/!*Address 1*!/*/}
                                    <Grid item container direction={"row"} spacing={2}>
                                        <Grid item>
                                            <Field
                                                 error={errors[STREET] && touched[STREET]}
                                                 component={TextField}
                                                 type={"text"}
                                                 name={STREET}
                                                 label="Street"
                                                 className={classes.formField}
                                                 fullWidth
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Field
                                                 error={errors[CITY] && touched[CITY]}
                                                 component={TextField}
                                                 type={"text"}
                                                 name={CITY}
                                                 label="City"
                                                 className={classes.formField}
                                                 fullWidth
                                            />
                                        </Grid>
                                    </Grid>

                                    {/*/!*Address 2*!/*/}
                                    <Grid item container direction={"row"} spacing={2}>
                                        <Grid item>
                                            <Field
                                                 error={errors[PROVINCE] && touched[PROVINCE]}
                                                 component={TextField}
                                                 type={"text"}
                                                 name={PROVINCE}
                                                 label="Province"
                                                 className={classes.formField}
                                                 fullWidth
                                                 required
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Field
                                                 error={errors[ZIP] && touched[ZIP]}
                                                 component={TextField}
                                                 type={"text"}
                                                 name={ZIP}
                                                 label="Zip"
                                                 className={classes.formField}
                                                 fullWidth
                                                 required
                                            />
                                        </Grid>
                                    </Grid>

                                    {/*/!*Zone*!/*/}
                                    <Grid item container direction={"row"}>
                                        <Grid item>
                                            <Field
                                                component={TextField}
                                                type="text"
                                                name={ZONE}
                                                error={errors[ZONE] && touched[ZONE]}
                                                label="Zone"
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
                                                {zones.map((zone) => (
                                                    <MenuItem key={zone.id} value={zone.id}>{zone.name}</MenuItem>
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
                                                Add
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
    )

}