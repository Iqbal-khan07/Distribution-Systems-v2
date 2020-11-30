import React from "react";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import {makeStyles} from "@material-ui/core/styles";
import ReactApexChart from "react-apexcharts";

const useStyles = makeStyles((theme) => ({
    card: {
        minWidth: '460px',
        // maxWidth: '300px',
    },
    root: {
        padding: '0px',
    },
    title: {
        backgroundColor: '#232E33',
        color: 'rgb(255,255,255,0.6)',
        padding: '5px',
    },
}));



const options = {
    chart: {
        type: 'bar',
    },
    labels: ['Delivered', 'Paid', 'Pending'],
    plotOptions: {
        bar: {
            horizontal: true,
            distributed: true,
        }
    },
    dataLabels: {
        enabled: false
    },
    xaxis: {
        categories: ['Delivered', 'Paid', 'Pending']
    },
    yaxis: {
      show: true,
      showAlways: true,
      labels: {
          show: true,
          align: 'right',
          minWidth: 0,
          maxWidth: 160,
          style: {
              colors: [],
              fontSize: '16px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 400,
              cssClass: 'apexcharts-yaxis-label',
          },
      },
  },
    colors: ['#33b2df', '#546E7A', '#d4526e']
};

export default function OrderByStatus({series}) {
    const classes = useStyles();
    return (
        <Card raised className={classes.card}>
            <CardContent className={classes.root}>
                <Typography variant="h4" className={classes.title} align="center">
                    Orders By Status
                </Typography>
                <div>
                    <ReactApexChart
                        options={options}
                        series={[{data: series}]}
                        type={"bar"}
                    />
                </div>
            </CardContent>
        </Card>
    )
}