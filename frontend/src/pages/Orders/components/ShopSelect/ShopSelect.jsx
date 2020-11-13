import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import {makeStyles} from "@material-ui/core/styles";
import {TextField} from 'formik-material-ui'
import {Field} from 'formik'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    maxWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function ShopSelect ({shops, name, value}) {
    const classes = useStyles();
    return (
        <Field
            component={TextField}
            type="text"
            name={name}
            label="Client*"
            select
            variant="standard"
            helperText="Select a Shop (Required)"
            margin="normal"
            InputLabelProps={{
                shrink: true,
            }}
            className={classes.formControl}
        >
            <MenuItem value="">
                <em>None</em>
            </MenuItem>
            {shops.map((shop) => (
                <MenuItem key={shop.id} value={shop.id}>{`${shop.name} [${shop.zone}]`}</MenuItem>
            ))}
        </Field>
    )
}