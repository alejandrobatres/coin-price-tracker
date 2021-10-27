import React from 'react';
import './App.css';
import Price from './Price';

export default function Coin(props) {
  var rec;
  var oth;

  const p = props.coinBuy;
  const g = props.gem;

  if (parseFloat(p) > parseFloat(g)) {
    oth = <Price exchange="Coinbase" buy={props.coinBuy} sell={props.coinSell} /> 
    rec = <Price exchange="Gemini" buy={props.gem} sell={props.gem} />
  } else {
    rec = <Price exchange="Coinbase" buy={props.coinBuy} sell={props.coinSell} /> 
    oth = <Price exchange="Gemini" buy={props.gem} sell={props.gem} />
  }
  return (
    <div className="coin-container">
      <div className="horizontal-container">
        <img src={props.coinImage} className="App-logo" alt={props.name} />
        <p className="coin-name">{props.name}</p>
      </div>
      <p className="exchange-type">Recommended:</p>
      {rec}
      <p className="exchange-type">Other:</p>
      {oth}
    </div>
  )
}
