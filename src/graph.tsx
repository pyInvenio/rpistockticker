import React, { Component, useEffect, useState } from "react";
import 'anychart';

import ApexCharts from 'apexcharts'
import ReactApexChart from 'react-apexcharts'
const Graph = ({ stocks }) => {
    const [graphData, setGraphData] = useState<number[][]>();
    const [stockData, setStockData] = useState([]);
    const [symbol, setSymbol] = useState("");
    const [interval, setInterval] = useState("");
    var chart: ApexCharts;
    useEffect(() => {
        if (stocks == undefined || stocks["Meta Data"] == undefined) {
            return () => { <div>Loading...</div> };
        }
        else {
            if (chart != undefined) {
                console.log("destroyed");
                chart.destroy();
            }
            var metadata = stocks["Meta Data"]
            var information = metadata["1. Information"];
            var symbol = metadata["2. Symbol"];
            var lastRefresh = metadata["3. Last Refreshed"];
            var interval = metadata["4. Interval"];
            var timezone = metadata["6. Time Zone"];
            var stockData = stocks["Time Series (5min)"];

            var graphData: number[][] = [];

            for (var i = 0; i < Object.keys(stockData).length; i++) {
                var time = Object.keys(stockData)[i];
                var value: string = stockData[time];
                var open: string = value["1. open"];
                var high: string = value["2. high"];
                var low: string = value["3. low"];
                var close: string = value["4. close"];
                var volume: string = value["5. volume"];
                var date = new Date(time);
                graphData[i] = [date[Symbol.toPrimitive]('number'), [+open, +high, +low, +close]];
            }
            console.log(symbol);
            setGraphData(graphData);
            setStockData(stockData);
            setSymbol(symbol);
            setInterval(interval);
            var options = {
                series: [{
                    name: symbol,
                    data: graphData,
                    type: 'candlestick',
                }],
                xaxis: {
                    type: 'datetime',
                    labels: {
                        show: true,
                        rotate: -45,
                        rotateAlways: false,
                        hideOverlappingLabels: true,
                        showDuplicates: false,
                        trim: false,
                        minHeight: undefined,
                        maxHeight: 120,
                        style: {
                            colors: '#FFFFFF',
                            fontSize: '18px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            fontWeight: 400,
                            cssClass: 'apexcharts-xaxis-label',
                        },
                        offsetX: 0,
                        offsetY: 0,
                        format: undefined,
                        formatter: undefined,
                        datetimeUTC: true,
                        datetimeFormatter: {
                            year: 'yyyy',
                            month: "MMM 'yy",
                            day: 'dd MMM',
                            hour: 'HH:mm',
                        },
                    },
                    axisBorder: {
                        show: true,
                        color: '#ffffff',
                        height: 1,
                        width: '100%',
                        offsetX: 0,
                        offsetY: 0
                    },
                    axisTicks: {
                        show: true,
                        borderType: 'solid',
                        color: '#ffffff',
                        height: 6,
                        offsetX: 0,
                        offsetY: 0
                    },

                    title: {
                        text: undefined,
                        offsetX: 0,
                        offsetY: 0,
                        style: {
                            color: '#FFFFFF',
                            fontSize: '12px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            fontWeight: 600,
                            cssClass: 'apexcharts-xaxis-title',
                        },
                    },
                },
                // dataLabels: {
                //     style: {
                //       colors: ['#F44336', '#E91E63', '#9C27B0']
                //     }
                //   },
                chart: {
                    height: '100%',
                    type: 'candlestick',
                    id: 'stockchart',
                },
                title: {
                    text: symbol + " (" + interval + ")",
                    align: 'left',
                    style: {
                        color: '#fffbb8',
                        fontSize: '18px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 600,
                        cssClass: 'apexcharts-xaxis-label',
                    },
                    
                },
                yaxis: {
                    tooltip: {
                        enabled: true
                    },

                    axisTicks: {
                        show: true,
                        borderType: 'solid',
                        color: '#1cd2ff',
                        height: 6,
                        offsetX: 0,
                        offsetY: 0
                    },
                    labels: {
                        //type: 'double',
                        show: true,
                        //rotate: -45,
                        rotateAlways: false,
                        hideOverlappingLabels: true,
                        showDuplicates: false,
                        style: {
                            colors: '#1cd2ff',
                            fontSize: '18px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            fontWeight: 400,
                            cssClass: 'apexcharts-xaxis-label',
                        },
                        formatter: function (val, index) {
                            return "$"+val.toFixed(2);
                        }
                    },

                    title: {
                        text: undefined,
                        offsetX: 0,
                        offsetY: 0,
                        style: {
                            color: '#FFFFFF',
                            fontSize: '12px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            fontWeight: 600,
                            cssClass: 'apexcharts-xaxis-title',
                        },
                    },
                },

            }
            if (chart == undefined) {
                var element = document.querySelector("#apexchartsstockchart");
                if (element) {
                    element.remove();
                }
                chart = new ApexCharts(document.querySelector("#chart"), options);
                chart.render();

            }
            else {
                chart.updateOptions(options);
                // chart.updateSeries([{
                //     name: symbol,
                //     data: graphData,
                //     type: 'candlestick',
                // }]);

            }

        }
    }, [stocks]);

    return (
        <div id="chart" className="">
            {/* <ReactApexChart id="chart" type="candlestick" height={350} /> */}

        </div>
    )
}
export default Graph;
