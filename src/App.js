import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    shopList: [
      {name: "Apple", price: 2.5},
      {name: "Orange", price: 30},
      {name: "Banana", price: 18.45},
      {name: "Grape", price: 59.85},
      {name: "Lemon", price: 9.75}
    ],
    basket: 0,
    wallet: 60,
    itemExpensive: false,
    sum: 0
  }

  addItemHandler = (item) => {
    if(item.price >  this.state.wallet) {
      this.setState({itemExpensive: item.name})
    } else if(!item.added) {
      const itemIdex = this.state.shopList.indexOf(item);
      const newShopList = {...this.state.shopList};
      const newWallet = this.state.wallet - item.price;
      const newSum = this.state.sum + item.price;
      newShopList[itemIdex].added = true;
      this.setState({
        wallet: newWallet,
        sum: newSum,
        itemExpensive: false
      });
    } else {
      const itemIdex = this.state.shopList.indexOf(item);
      const newShopList = {...this.state.shopList};
      const newWallet = this.state.wallet + item.price;
      const newSum = this.state.sum - item.price;
      newShopList[itemIdex].added = false;
      this.setState({
        wallet: newWallet,
        sum: newSum,
        itemExpensive: false
      });
    }
  }

  render() {
    let tooExpensive = null;

    let shopList = 
      <ul className="shop-list">
        {this.state.shopList.map(item => {
          const price = "$" + item.price.toFixed(2);
          let expensive = false;
          if(item.price > this.state.wallet) {
            expensive = true;
          }
          return (
            <li className={`shop-list__item ${expensive ? "expensive" : ""} ${item.added ? "added": ""}`}
            key={item.name}
            onClick={() => this.addItemHandler(item)}>
              <span>{item.name}</span>
              <span>{price}</span>
            </li>
          )
        })}
      </ul>

      if(this.state.itemExpensive) {
        tooExpensive = <p>You don't have enough money for: {this.state.itemExpensive}</p>
      }


    return(
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="container">
          ${this.state.wallet}
          {shopList}
          ${this.state.sum}
          {tooExpensive}
        </div>
    </div>
    )
  }
}

export default App;
