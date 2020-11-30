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
        minHeight: 420
    },
    root: {
        padding: 0,
        "&:last-child": {
            paddingBottom: 0
          }
      
    },
    title: {
        backgroundColor: '#232E33',
        color: 'rgb(255,255,255,0.6)',
        padding: '5px',
    },
    content: {
        padding: theme.spacing(3),
    },
}));



const options = {
    chart: {
        type: 'bar',
    },
    labels: ['Delivered', 'Paid', 'Pending'],
    legend: {
        show: false,
    },
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
              fontSize: '18px',
              fontFamily: 'Montserrat',
              fontWeight: 400,
              cssClass: 'apexcharts-yaxis-label',
          },
      },
  },
    colors: ['#5DB285', '#F6E337', '#FB7373'],
    responsive: [
        {
            breakpoint: 480,
            options: {
                bar: {
                    width: 250
                },
                legend: {
                    show: false,
                    position: 'right',
                    offsetY: 0,
                    height: 230,
                }
            }
        }
    ],

};

export default function OrderByStatus({series}) {
    const classes = useStyles();
    return (
        <Card raised className={classes.card}>
            <CardContent className={classes.root}>
                <Typography variant="h4" className={classes.title} align="center">
                    Orders By Status
                </Typography>
                <div className={classes.content}>
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