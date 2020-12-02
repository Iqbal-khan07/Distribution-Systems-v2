import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import {makeStyles} from "@material-ui/core/styles";
import {TextField} from 'formik-material-ui'
import {Field} from 'formik'

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        width: props => props.width,
        marginRight: '100%'
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function PaymentMethodSelect (props) {
    const classes = useStyles(props);
    const {methods, name} = props;
    return (
        <Field
            component={TextField}
            type="text"
            name={name}
            label="Payment Method*"
            select
            variant="standard"
            margin="normal"
            InputLabelProps={{
                shrink: true,
            }}
            className={classes.formControl}
        >
            {methods.map((method) => (
                <MenuItem key={method} value={method}>{`${method}`}</MenuItem>
            ))}
        </Field>
    )
}