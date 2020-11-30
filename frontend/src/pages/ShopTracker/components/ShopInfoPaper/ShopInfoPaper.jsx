import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import ShopImage from "../../../../assests/images/shop-icon.png";
import CardMedia from "@material-ui/core/CardMedia";
import React from "react";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 40,
        minWidth: "500px",
        maxWidth: "1000px",
        minHeight: "250px",
        backgroundColor: '#BFDCCD',
    },
    content: {
        marginTop: theme.spacing(2),
    },
    cover: {
        width: 151,
        height: 151,
        marginRight: theme.spacing(6),
    },
    detailSection: {
        display: 'flex',
        flexDirection: 'row',
        margin: theme.spacing(2),
    },
    detailColumn: {
        minWidth: 30,
        marginRight: theme.spacing(5)
    }
}));

export default function ShopInfoPaper (props) {
    const classes = useStyles();

    return (
        <Paper className={classes.root} elevation={2}>
            <Grid container spacing={2}>
                <Grid item xs={11}>
                    <Typography variant="h5" style={{marginLeft: 10}}>Shop Info</Typography>
                </Grid>
                <Grid item xs={1}>
                    <Tooltip title="Edit Shop" aria-label="Edit Shop">
                        <IconButton size="small">
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
            <Divider />
            <div className={classes.detailSection}>
                <div>
                    <CardMedia
                        className={classes.cover}
                        image={ShopImage}
                    />
                </div>
                <div className={classes.detailColumn}>
                    <Typography gutterBottom>{props.name}</Typography>
                    <Typography gutterBottom>{props.street} {props.city}, {props.providence} {props.zip}</Typography>
                    <Typography gutterBottom>Id: {props.id}</Typography>
                    <Typography gutterBottom>Zone: {props.zoneName}</Typography>
                </div>
                <div className={classes.detailColumn}>
                    <Typography gutterBottom>
                        Apples
                        {/*{props.phone != null && "Phone: " + props.phone}*/}
                    </Typography>
                    <Typography gutterBottom>
                        Banaas
                        {/*{props.email != null && "Email: " + props.email}*/}
                    </Typography>
                </div>
            </div>
        </Paper>
    );
}