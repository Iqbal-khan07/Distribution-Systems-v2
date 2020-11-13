import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#BFDCCD',
        marginTop: '24px',
    },
    title: {
        backgroundColor: '#232E33',
        color: 'rgb(255,255,255,0.6)',
        padding: '5px',
    },
}));

export default function(props) {
    const classes = useStyles();
    
    return(
        <Paper className={classes.root}>
            <Typography variant="h5">Shop Info</Typography>
            <Divider />
            {"hi"}
        </Paper>
    );
}