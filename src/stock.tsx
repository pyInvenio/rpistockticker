import React, { Component, useEffect, useState } from "react";

const Stock = ({ stock }) => {
    if (stock == undefined) {
        return <div className="text-3xl text-emerald-400"><h1>Loading...</h1></div>;
    }
    var stockName = stock["01. symbol"];
    var stockPrice = stock["05. price"];
    var stockOpen = stock["02. open"];
    var stockHigh = stock["03. high"];
    var stockLow = stock["04. low"];
    var stockVolume = stock["06. volume"];
    var stockTimestamp = stock["07. latest trading day"];
    var stockPreviousClose = stock["08. previous close"];
    var stockChange = stock["09. change"];
    var stockChangePercent = stock["10. change percent"];
    var up = true;
    var higher = true;
    var lower = false;
    if (+stockHigh < +stockOpen) {
        higher = false;
    }
    if (+stockLow > +stockOpen) {
        lower = true;
    }
    if (+stockChange < 0) {
        up = false;
    }
    return (
        <div>
            <div className="flex flex-row gap-4  items-center  justify-center place-content-evenly">
                <div className="space-y-5 text-left">

                    <p className="text-amber-500 text-4xl font-semibold">Open: {stockOpen}</p>
                    <p className={(higher ? "text-emerald-400" : "text-red-400") + " text-4xl font-semibold"}>High: ${stockHigh}</p>
                    <p className={(lower ? "text-emerald-400" : "text-red-400") + " text-4xl font-semibold"}>Low: ${stockLow}</p>
                </div>
                <div className="-space-y-5">

                    <h1 className={(up ? "text-emerald-400" : "text-red-400") + " text-[250px] font-bold "}>{stockName}</h1>
                    <div className="flex flex-row gap-10  items-center  justify-center">
                        <p className={(up ? "text-emerald-400" : "text-red-400") + " text-5xl font-bold"} >${stockChange}</p>
                        <p className={(up ? "text-emerald-400" : "text-red-400") + " text-9xl font-semibold"}>${stockPrice}</p>
                        <p className={(up ? "text-emerald-400" : "text-red-400") + " text-5xl font-bold"}>{stockChangePercent}</p></div>
                </div>
                <div className="space-y-5 text-right">
                    <p className="text-sky-500 text-4xl font-semibold">Date: {stockTimestamp}</p>
                    <p className="text-amber-500 text-4xl font-semibold">Volume: {stockVolume}</p>

                    <p className="text-amber-500 text-4xl font-semibold">Prev. Close: ${stockPreviousClose}</p>

                </div>
            </div>
        </div>
    );
}
export default Stock;
