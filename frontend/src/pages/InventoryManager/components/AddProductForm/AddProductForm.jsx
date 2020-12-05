import React, {useContext} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {NotificationContext} from "../../../../context/NotificationContext";
import {Field, Form, Formik} from "formik";
import axios from "axios";
import {ERROR, SUCCESSFUL} from "../../../../constants/NOTIFICATION_TYPES";
import Backdrop from "@material-ui/core/Backdrop";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import {TextField} from "formik-material-ui";
import MenuItem from "@material-ui/core/MenuItem";
import {Button} from "@material-ui/core";
import * as Yup from "yup";
import MultiLineInput from "../../../../shared/MultiLineInput/MultiLineInput";

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

const NAME = 'name'
const COMPANY = 'company'
const IMAGE_URL = 'image_url'
const DESCRIPTION = 'description'
const BUYING = 'buying'
const SELLING = 'selling'


const validationSchema = Yup.object({
    [NAME]: Yup.string().required('name is required'),
    [COMPANY]: Yup.string("must be number").required("Choose a company"),
    [IMAGE_URL]: Yup.string().url('Enter a Valid Image Url'),
    [DESCRIPTION]: Yup.string(),
    [BUYING]: Yup.number().min(0, "Value should be greater than zero").required(),
    [SELLING]: Yup.number().min(0, "Value should be greater than zero").required(),
})

export default function AddProductForm({reload, onCloseButtonHandler, showForm, companies}) {
    const classes = useStyles();
    const { setANotification } = useContext(NotificationContext)

    return (
        <Formik
            initialValues={{
                [NAME]: '',
                [COMPANY]: '',
                [IMAGE_URL]: '',
                [DESCRIPTION]: '',
                [BUYING]: '',
                [SELLING]: '',
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, {setSubmitting, resetForm}) => {
                setSubmitting(true)
                try {
                    // await axios.post('/create/shop', {
                    //     data: {
                    //         name: values[SHOP_NAME],
                    //         email: values[EMAIL],
                    //         image_url: values[IMAGE_URL],
                    //         phone_number: values[PHONE],
                    //         category: values[CATEGORY],
                    //         street: values[STREET],
                    //         city: values[CITY],
                    //         providence: values[PROVINCE],
                    //         zip_4: values[ZIP],
                    //         zones: [
                    //             {
                    //                 id: values[ZONE]
                    //             }
                    //         ]
                    //     }
                    // })
                    setANotification('Added Product Successfully', SUCCESSFUL)
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
                            <Typography className={classes.title} variant={"h6"}>Add A New Product</Typography>
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
                                            <Avatar variant="square" className={classes.cover} src={values[IMAGE_URL]}>
                                                Product Image
                                            </Avatar>
                                        </Grid>
                                        <Grid item direction={"column"} xs={7}>
                                            <Grid item>
                                                <Field
                                                     error={errors[NAME] && touched[NAME]}
                                                     component={TextField}
                                                     type={"text"}
                                                     name={NAME}
                                                     label="Product Name"
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
                                                    name={COMPANY}
                                                    error={errors[COMPANY] && touched[COMPANY]}
                                                    label="Company"
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
                                                    {companies.map((company) => (
                                                        <MenuItem key={company.id} value={company.id}>{company.name}</MenuItem>
                                                    ))}
                                                </Field>
                                                <Field
                                                     error={errors[IMAGE_URL] && touched[IMAGE_URL]}
                                                     component={TextField}
                                                     type={"text"}
                                                     name={IMAGE_URL}
                                                     label="Product Image Url"
                                                     className={classes.formField}
                                                     style={{marginLeft: 30}}
                                                     // fullWidth
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    {/*price info*/}
                                    <Grid item container direction={"row"} spacing={2}>
                                        <Grid item>
                                            <Field
                                                 error={errors[BUYING] && touched[BUYING]}
                                                 component={TextField}
                                                 type={"text"}
                                                 name={BUYING}
                                                 label="Buying Price"
                                                 className={classes.formField}
                                                 fullWidth
                                                 required
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Field
                                                 error={errors[SELLING] && touched[SELLING]}
                                                 component={TextField}
                                                 type={"text"}
                                                 name={SELLING}
                                                 label="Selling Price"
                                                 className={classes.formField}
                                                 fullWidth
                                                 required
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid item container direction={"row"}>
                                        <Grid item sm={12}>
                                            <MultiLineInput
                                                 name={DESCRIPTION}
                                                 rows={3}
                                                 placeholder={'Product Description'}
                                            />
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