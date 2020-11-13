import React from "react";
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    contentHolder: {
        color: "#e5e4e4"
    },
    button: {
        backgroundColor: "#5DB285",
        borderRadius: 15,
        width: '12rem',
        height: "7rem",
        '&:hover': {
            backgroundColor: "#BFDCCD",
            color: "#e5e4e4"
        }
    },

}));


const ShowAddOrderFormButton = ({onClickHandler, title, disable}) => {
    const classes = useStyles();
    return (
        <Button
            disabled={disable}
            onClick={onClickHandler}
            className={classes.button}
        >
            <div onClick={onClickHandler} className={classes.contentHolder}>
                <AddCircleOutlineIcon style={{fontSize: 50}}/>
                <Typography style={{fontWeight: 'bold'}}>{title}</Typography>
            </div>
        </Button>
    )
}

export default ShowAddOrderFormButton;