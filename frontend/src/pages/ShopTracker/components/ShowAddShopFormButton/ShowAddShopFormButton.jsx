import React from "react";
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    card: {
        minWidth: '200px',
        maxWidth: '300px',
        backgroundColor: 'transparent',
    },
    contentHolder: {
        color: "#e5e4e4"
    },
    button: {
        backgroundColor: "#5DB285",
        borderRadius: 15,
        width: "100%",
        height: "9rem",
        '&:hover': {
            backgroundColor: "#427C5D",
            color: "#e5e4e4"
        }
    },

}));


const ShowAddShopFormButton = ({ onClickHandler, title, disable }) => {
    const classes = useStyles();
    return (
        <div className={classes.card}>
        <Button
            disabled={disable}
            onClick={onClickHandler}
            className={classes.button}
        >
            <div onClick={onClickHandler} className={classes.contentHolder}>
                <AddCircleOutlineIcon style={{ fontSize: 60 }} />
                <Typography style={{ fontWeight: 'bold' }}>{title}</Typography>
            </div>
        </Button>
        </div>
    )
}

export default ShowAddShopFormButton;