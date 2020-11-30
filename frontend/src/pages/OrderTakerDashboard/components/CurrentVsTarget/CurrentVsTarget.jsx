import React from "react";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ReactApexChart from 'react-apexcharts'
import DataDisplayUtils from "../../../../utils/DataDisplayUtils";

const useStyles = makeStyles((theme) => ({
    card: {
        minWidth: '200px',
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
    // display: {
    //     backgroundColor: '#BFD7DC',
    //     minWidth: '150px',
    //     minHeight: '150px',
    //     fontSize: '80px',
    //     color: 'rgb(35, 46, 51, 0.8)',
    //     marginRight: 'auto',
    //     marginLeft: 'auto',
    //     marginTop: '24px',
    // },
}));

const options =  {
    chart: {
        type: 'donut',
    },
    labels: ['Target Sales', 'Current Sales'],
    legend: {
        show: true,
        showForSingleSeries: false,
        showForNullSeries: true,
        showForZeroSeries: true,
        position: 'bottom',
        horizontalAlign: 'center',
        floating: false,
        fontSize: '17px',
        fontFamily: 'Helvetica, Arial',
        fontWeight: 400,
        formatter: undefined,
        inverseOrder: false,
        width: undefined,
        height: undefined,
        tooltipHoverFormatter: undefined,
        offsetX: 0,
        offsetY: 0,
        labels: {
            colors: undefined,
            useSeriesColors: false
        },
        markers: {
            width: 12,
            height: 12,
            strokeWidth: 2,
            strokeColor: '#fff',
            fillColors: ['#E91E63', '#546E7A'],
            radius: 12,
        },
        itemMargin: {
            horizontal: 30,
            vertical: 0
        },
        onItemClick: {
            toggleDataSeries: true
        },
        onItemHover: {
            highlightDataSeries: true
        },
    },
    plotOptions: {
        pie: {
            donut: {
                size: 50,
                labels: {
                    show: true,
                    name: {
                        show: false
                    },
                    value: {
                        show: true,
                        fontSize: '22px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 600,
                        color: undefined,
                        formatter: function (val) {
                            return val + "%"
                        }
                    }
                }
            }
        }
    },
    colors: ['#546E7A', '#E91E63'],
    dataLabels: {
        enabled: true,
    },
    responsive: [
        {
            breakpoint: 480,
            options: {
                chart: {
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
    ]
};

export default function CurrentVsTarget({series}) {
    const classes = useStyles();
    return (
        <Card raised className={classes.card}>
            <CardContent className={classes.root}>
                <Typography variant="h4" className={classes.title} align="center">
                    Current Vs Target Sales
                </Typography>
                <div>
                    <ReactApexChart
                        options={options}
                        series={series}
                        type="donut"
                    />
                </div>
            </CardContent>
        </Card>
    )
}