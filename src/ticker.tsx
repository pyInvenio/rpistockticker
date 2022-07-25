import React, { Component, useEffect, useState } from "react";
//@ts-ignore
import Stock from './stock.tsx';
//@ts-ignore
import Graph from './graph.tsx';

type Props = {
    stocks: string[];
    interval: number;
}
var stockdataarray = {};
var stockgrapharray = {};
const apikey = "AF3G90Y9LNTU71EX";
const minute = 1000 * 60;
const hour = minute * 60;
const day = hour * 24;
const year = day * 365;
const Ticker = ({ stocks, interval }: Props) => {
    let tickdivider = -1;
    const [fillupconst, setFillupconst] = useState(1);
    const [updateindex, setupdateindex] = useState(0);
    const [updategraphindex, setupdategraphindex] = useState(0);
    const [index, setIndex] = useState(0);
    const [currentStock, setCurrentStock] = useState(stocks[index]);
    const [graphData, setGraphData] = useState([]);
    const [stockData, setStockData] = useState([]);
    const [fillupgraphconst, setFillupgraphconst] = useState(1);
    const updateStock = () => {
        var today = new Date();
        var hours = today.getHours();
        if ((hours < 9 || hours > 17) && Object.keys(stockdataarray).length >=stocks.length && Object.keys(stockgrapharray).length >=stocks.length) {
            return
        }
        if (Object.keys(stockdataarray).length >= stocks.length) {
            setFillupconst(32);
        }
        if (Object.keys(stockgrapharray).length >= stocks.length) {
            setFillupgraphconst(320);
        }
        if (tickdivider % fillupconst == 0) {
            setupdateindex((updateindex + 1) % stocks.length);
            console.log(updateindex);
            var url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + stocks[updateindex] + "&apikey=" + apikey;
            const response = fetch(url).then(response => response.json());

            response.then(data => {
                if (data == undefined || data["Global Quote"] == undefined) {
                    return
                }
                stockdataarray[stocks[updateindex]] = data["Global Quote"];
                console.log("Here")
                console.log(stockdataarray[stocks[updateindex]]);
            })
        }
        if (tickdivider % fillupgraphconst == 0) {
            setupdategraphindex((updategraphindex + 1) % stocks.length);
            var url = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" + stocks[updategraphindex] + "&interval=5min&apikey=" + apikey;
            const response = fetch(url).then(response => response.json());
            response.then(data => {
                if (data["Meta Data"] == undefined || data == undefined) {
                    return
                }
                stockgrapharray[stocks[updategraphindex]] = data;
            })
        }
    }
    const rotateStock = () => {
        tickdivider++;
        setIndex((index + 1) % stocks.length);
        setCurrentStock(stocks[index]);
        setStockData(stockdataarray[currentStock]);
        setGraphData(stockgrapharray[currentStock]);
        console.log(index);

    }

    const updateAllStocks = () => {
        rotateStock();
        updateStock();
    }

    useEffect(() => {
        var i = setInterval(updateAllStocks, interval);
        return () => {
            clearInterval(i);
        }
    });

    return (
        <div className="h-full w-full pb-10 pl-10 pr-10">
            <div className="h-1/2">
            <Stock stock={stockData} /></div>
            <div className="h-1/2 ">
            <Graph stocks={graphData} /></div>
        </div>
    )
}

export default Ticker;