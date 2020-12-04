import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import React from "react";

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 300,
        maxWidth: 500,
        backgroundColor: '#BFD7DC',
    },
    name: {
        color: theme.primary,
    },
    content: {
        padding: theme.spacing(2),
    },
    cover: {
        width: 100,
        height: 100,
    },
    rightSpace: {
        marginRight: theme.spacing(3),
    },
}));

export default function EmployeeInfoCard({ employee }) {
    const classes = useStyles();

    return (
        <Paper className={classes.root} elevation={2}>
            <Grid container spacing={2}>
                <Grid item xs={10}>
                    <Typography variant="h5" style={{ marginLeft: 10 }}>Employee Info</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Tooltip title="Edit Employee" aria-label="Edit Employee">
                        <IconButton size="small">
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
            <Divider />
            <Grid container spacing={2} className={classes.content}>
                <Grid item xs={12}>
                    <Grid container spacing={3}>
                        <Grid item>
                            <Grid container justify="center">
                                <Avatar alt="Employee Photo" src={employee.pic} className={classes.cover} />
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Typography variant="h5" color="primary">{employee.name}</Typography>
                            <Typography><b>Role:</b> {employee.role}</Typography>
                            <Typography><b>Id:</b> {employee.id}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Typography display="inline" className={classes.rightSpace}><b>Username:</b> {employee.userName}</Typography>
                    <Typography display="inline"><b>Phone:</b> {employee.phone === null ? "N/A" : employee.phone}</Typography>
                    <Typography><b>Facebook Email:</b> {employee.fbEmail === null ? "N/A" : employee.fbEmail}</Typography>
                    <Typography><b>Gmail:</b> {employee.gmail === null ? "N/A" : employee.gmail}</Typography>
                    <Typography>
                        {/*{employee.email != null && "Email: " + employee.email}*/}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
}