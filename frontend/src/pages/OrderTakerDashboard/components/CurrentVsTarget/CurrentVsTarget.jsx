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
        minHeight: 420
    },
    root: {
        padding: '0px',
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
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(3),
    }
}));

const options =  {
    chart: {
        type: 'donut',
    },
    labels: ['Target Sales', 'Current Sales'],
    colors: ['#5DB285', '#BFDCCD'],
    legend: {
        show: true,
        showForSingleSeries: false,
        showForNullSeries: true,
        showForZeroSeries: true,
        position: 'right',
        horizontalAlign: 'right',
        verticalAlign: 'bottom',
        floating: false,
        fontSize: '17px',
        fontFamily: 'Montserrat',
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
            width: 15,
            height: 15,
            strokeWidth: 2,
            strokeColor: '#fff',
            fillColors: ['#5DB285', '#BFDCCD'],
            radius: 15,
        },
        itemMargin: {
            horizontal: 0,
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
                        show: true
                    },
                    value: {
                        show: true,
                        fontSize: '35px',
                        fontFamily: 'Montserrat',
                        fontWeight: 500,
                        color: undefined,
                        formatter: function (val) {
                            return val + "%"
                        }
                    }
                }
            }
        }
    },
    dataLabels: {
        enabled: true,
        style: {
            fontFamily: 'Montserrat',
            fontSize: 16,
            fontWeight: 500,
        }
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
    ],
    stroke: {
        width: 15
    }
};

export default function CurrentVsTarget({series}) {
    const classes = useStyles();
    return (
        <Card raised className={classes.card}>
            <CardContent className={classes.root}>
                <Typography variant="h4" className={classes.title} align="center">
                    Current vs. Target Sales
                </Typography>
                <div className={classes.content}>
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