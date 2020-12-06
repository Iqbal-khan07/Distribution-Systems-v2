import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import DataDisplayUtils from "../../../../utils/DataDisplayUtils";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from 'axios';
import React, { useState, useEffect } from "react";


const useStyles = makeStyles((theme) => ({
    card: {
        minWidth: '200px',
        maxWidth: '300px',
        margin: 0,
    },
    root: {
        padding: '0px',
    },
    title: {
        backgroundColor: '#232E33',
        color: 'rgb(255,255,255,0.6)',
        padding: '5px',
    },
    heading: {
        fontSize: 40,
        padding: '5px',
        textShadow: '1px 1px 4px #b8b8b8',
    },
    description: {
        fontWeight: 'thin',
        opacity: 0.5,
    },

}));

export default function OrderTakerGoalCard(props) {
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [goals, setGoals] = useState(null);
    useEffect(() => {
        async function fetchData() {
            await axios.post("/goal/order_taker", {
                data: {
                    order_taker_id: props.id
                }
            }
            ).then(function (response) {
                let body = response.data.data;
                const rawGoals = {
                    goal: body.goal_total,
                    current: body.current_value_total,
                    order: body.num_orders_total
                };

                setGoals(rawGoals);
            }).catch(function (error) {
                alert(error);
                const rawGoals = {
                    goal: 0,
                    current: 0,
                    order: 0
                }
                setGoals(rawGoals);
            }).then(function () {
                setLoading(false);
            });
        }
        fetchData().then()
    }, [props])

    const section = (title, value) => {
        return (
            <div>
                <Typography variant="h3" className={classes.heading} align="center">
                    {title}
                </Typography>
                <Typography variant="subtitle2" className={classes.description} align="center">
                    {value}
                </Typography>
            </div>
        );
    };
    return (
        <Card raised className={classes.card}>
            <CardContent className={classes.root}>
                <Typography variant="h6" className={classes.title} align="center">
                    {props.name}'s Goal Status
                </Typography>
                {!loading ? (
                    <>

                        {section(DataDisplayUtils.numberWithCommas(goals.goal), "Target for the Month")}
                        {section(DataDisplayUtils.numberWithCommas(goals.current), "Current Sales Value")}
                        {section(DataDisplayUtils.numberWithCommas(goals.order), "Orders Placed this Month")}
                    </>
                ) : <CircularProgress />
                }

            </CardContent>
        </Card>
    );
}