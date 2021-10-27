import React, { useState, setState, useEffect } from 'react';
import logo from './logo.svg';
import bitcoin from './bitcoin.svg';
import ethereum from './ethereum.svg';
import './App.css';
import Price from './Price';
import Coin from './Coin';
import axios from 'axios';

export default function App() {
  const [coinBuyBTC, setCoinBuyBTC] = useState([]);
  const [coinBuyETH, setCoinBuyETH] = useState([]);
  const [coinSellBTC, setCoinSellBTC] = useState([]);
  const [coinSellETH, setCoinSellETH] = useState([]);

  const [gemBTC, setGemBTC] = useState([]);
  const [gemETH, setGemETH] = useState([]);

  const fetchData = () => {

    const BUY_BTC = axios.get("https://api.coinbase.com/v2/prices/BTC-USD/buy")
    const SELL_BTC = axios.get("https://api.coinbase.com/v2/prices/BTC-USD/sell")

    const BUY_ETH = axios.get("https://api.coinbase.com/v2/prices/ETH-USD/buy")
    const SELL_ETH = axios.get("https://api.coinbase.com/v2/prices/ETH-USD/buy")

    const GEM = axios.get("https://api.gemini.com/v1/pricefeed");

    axios.all([BUY_BTC, SELL_BTC, BUY_ETH, SELL_ETH, GEM])
      .then(axios.spread((...allData) => {
        console.log(allData)
        const getCoinBuyBTC = allData[0].data.data.amount;
        const getCoinSellBTC = allData[1].data.data.amount;
        const getCoinBuyETH = allData[2].data.data.amount;
        const getCoinSellETH = allData[3].data.data.amount;
         
        const getGemBTC = allData[4].data.filter( function(data) { return data.pair == "BTCUSD" })[0].price;
        const getGemETH = allData[4].data.filter( function(data) { return data.pair == "ETHUSD" })[0].price;


        setCoinBuyBTC(getCoinBuyBTC);
        setCoinSellBTC(getCoinSellBTC);
        setGemBTC(getGemBTC); 
        
        setCoinBuyETH(getCoinBuyETH);
        setCoinSellETH(getCoinSellETH);
        setGemETH(getGemETH);
      })
    )
  }

  useEffect(() => {
      fetchData();
    },);

  return (
    <div className="App">
      <header className="vertical-container">
        <h1>Bitcoin and Ethereum Prices Across Exchanges</h1>
      </header>
      <div className="horizontal-container">
        <Coin name="Bitcoin" coinImage={bitcoin} coinBuy={coinBuyBTC} coinSell={coinSellBTC} gem={gemBTC} />
        <Coin name="Ethereum" coinImage={ethereum} coinBuy={coinBuyETH} coinSell={coinSellETH} gem={gemETH} />
      </div>
    </div>
  );
}

