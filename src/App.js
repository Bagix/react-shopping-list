import React, { Component } from 'react';
import AddItem from './Components/AddItem/AddItem';
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
      this.updatedWalletDown(newWallet);
      this.updatedSumUp(newSum);
      newShopList[itemIdex].added = true;
      this.setState({
        // wallet: newWallet,
        // sum: newSum,
        itemExpensive: false
      });
    } else {
      const itemIdex = this.state.shopList.indexOf(item);
      const newShopList = {...this.state.shopList};
      const newWallet = this.state.wallet + item.price;
      const newSum = this.state.sum - item.price;
      this.updatedWalletUp(newWallet);
      this.updatedSumDown(newSum);
      newShopList[itemIdex].added = false;
      this.setState({
        // wallet: newWallet,
        // sum: newSum,
        itemExpensive: false
      });
    }
  }

  updatedSumUp = (targetSum) => {
    const target = Math.round(targetSum * 100) / 100;
    const speed = 100;
    const increase = target / speed;
    const newSum = Math.round((this.state.sum + increase) * 100) /100;

    if(this.state.sum < target) {
      this.setState({sum: newSum});
      setTimeout(() => {
        this.updatedSumUp(target)
      },1)
    } else {
      this.setState({sum: target});
    }
  }

  updatedWalletUp = (targetWallet) => {
    const target = Math.round(targetWallet * 100) / 100;
    const speed = 100;
    const increase = target / speed;
    const newWallet = Math.round((this.state.wallet + increase) * 100) /100;

    if(this.state.wallet < target) {
      this.setState({wallet: newWallet});
      setTimeout(() => {
        this.updatedWalletUp(target)
      },1)
    } else {
      this.setState({wallet: target});
    }
  }

  updatedSumDown = (targetSum) => {
    const target = Math.round(targetSum * 100) / 100;
    const speed = 50;
    let decrease = 0.35;
    if(target > 0 ) {
      decrease = target / speed;
    }
    const newSum = Math.round((this.state.sum - decrease) * 100) /100;

    if(this.state.sum > target) {
      this.setState({sum: newSum});
      setTimeout(() => {
        this.updatedSumDown(target)
      },1)
    } else {
      this.setState({sum: target});
    }
  }

  updatedWalletDown = (targetWallet) => {
    const target = Math.round(targetWallet * 100) / 100;
    const speed = 50;
    let decrease = 0.35;
    if(target > 0 ) {
      decrease = target / speed;
    }
    const newWallet = Math.round((this.state.wallet - decrease) * 100) /100;

    if(this.state.wallet > target) {
      this.setState({wallet: newWallet});
      setTimeout(() => {
        this.updatedWalletDown(target)
      },1)
    } else {
      this.setState({wallet: target});
    }
  }

  saveNewItemHandler = () => {
    // Add new item to shop list
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
        tooExpensive = <p className="error">You don't have enough money for: <span>{this.state.itemExpensive}</span></p>
      }


    return(
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="container">
          <AddItem
          click={this.saveNewItemHandler}/>
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
