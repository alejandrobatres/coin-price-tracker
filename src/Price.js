import './App.css';
import React from 'react';
import './App.css';

export default function Price(props) {
  return(
    <div className="price-container">
      <p className="exchange-name">{props.exchange}</p>
      <div className="price">
        <p className="price-text">BUY ${props.buy}</p>
      </div>
      <div className="price">
        <p className="price-text">SELL ${props.sell}</p>
      </div>
    </div>)
}
