import React from "react";
import MuiTextField from "@material-ui/core/TextField";
import {fieldToTextField} from "formik-material-ui";
import {Field} from "formik";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    memo: {
        marginTop: theme.spacing(2),
        width: '100%'
    },
}));


function multiLine(props) {
    const { form: { setFieldValue }, field: { name }, } = props;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const onChange = React.useCallback(
        (event) => {
            const { value } = event.target;
            setFieldValue(name, value);
        },
        [setFieldValue, name]
    );
    return <MuiTextField
        {...fieldToTextField(props)}
        onChange={onChange}
        rows={3}
        multiline
        variant="outlined"
    />;
}

export default function Memo ({name}) {
    const classes = useStyles();
    return (
        <Field
            component={multiLine}
            name={name}
            type="test"
            label="Memo"
            className={classes.memo}
        />
    )
}