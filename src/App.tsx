import './App.css';
import React, { Component, useEffect, useState } from "react";
// @ts-ignore
import Ticker from './ticker.tsx';

const stocks = ['AMZN', 'GOOG', 'VOO', 'VGT', 'AAPL', 'NVDA', 'XLE', 'VCR', 'UPWK']

function App() {
  return (
    <div className="App h-screen w-screen bg-gray-900">
      <Ticker stocks={stocks} interval={10000}/>
    </div>
  );
}

export default App;
