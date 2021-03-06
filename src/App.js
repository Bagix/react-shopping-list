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
    newItem: {
      name: '',
      price: '',
    },
    basket: 0,
    wallet: 60,
    itemExpensive: false,
    sum: 0,
    itemExists: null
  }

  addItemHandler = (item) => {
    if(item.price > this.state.wallet && item.added !== true) {
      this.setState({itemExpensive: item.name})
    } else if(!item.added) {
      const itemIdex = this.state.shopList.indexOf(item);
      const newShopList = [...this.state.shopList];
      const newWallet = this.state.wallet - item.price;
      const newSum = this.state.sum + item.price;
      this.updatedWalletDown(newWallet);
      this.updatedSumUp(newSum);
      newShopList[itemIdex].added = true;
      this.setState({
        itemExpensive: false
      });
    } else {
      const itemIdex = this.state.shopList.indexOf(item);
      const newShopList = [...this.state.shopList];
      const newWallet = this.state.wallet + item.price;
      const newSum = this.state.sum - item.price;
      this.updatedWalletUp(newWallet);
      this.updatedSumDown(newSum);
      newShopList[itemIdex].added = false;
      this.setState({
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
        this.updatedWalletDown(target);
      },1)
    } else {
      this.setState({wallet: target});
    }
  }

  prepareNameHandler = (event) => {
    const newItem = {...this.state.newItem};
    let name = event.target.value
    newItem.name = name.charAt(0).toUpperCase() + name.slice(1);
    this.setState({newItem: newItem});
  }

  preparePriceHandler = (event) => {
    const newItem = {...this.state.newItem};
    newItem.price = Number(event.target.value);
    this.setState({newItem: newItem});
  }

  saveNewItemHandler = () => {
    const name = this.state.newItem.name;
    const price = this.state.newItem.price;
    const newShopList = [...this.state.shopList];
    const newItem = {
      name: name,
      price: price
    }
    const itemExists = this.state.shopList.find(el => el.name === newItem.name)
    console.log(itemExists)
    if(!itemExists) {
      newShopList.push(newItem);
      this.setState({
        shopList: newShopList,
        newItem: {
          name: '',
          price: ''
        },
        itemExists: false
      });
    } else {
      this.setState({itemExists: itemExists});
    }
  }

  removeItemHandler = (item) => {
    const newShopList = [...this.state.shopList];
    const itemIndex = newShopList.indexOf(item);
    newShopList.splice(itemIndex, 1);
    this.setState({shopList: newShopList});
  }

  render() {
    let tooExpensive = null;
    let doubleItem = null;

    let shopList = 
      <ul className="shop-list">
        {this.state.shopList.map(item => {
          const price = "$" + item.price.toFixed(2);
          let expensive = false;
          if(item.price > this.state.wallet && item.addded === undefined) {
            console.log(item.added)
            expensive = true;
          }
          return (
            <li className={`shop-list__item ${item.added ? "added": expensive ? "expensive" : ""}`}
            key={item.name}>
              <div onClick={() => this.addItemHandler(item)}>
                <span>{item.name}</span>
                <span>{price}</span>
              </div>
              <span className="remove" onClick={() => this.removeItemHandler(item)}>X</span>
            </li>
          )
        })}
      </ul>

      if(this.state.itemExpensive) {
        tooExpensive = <p className="error">You don't have enough money for: <span>{this.state.itemExpensive}</span></p>
      }

      if(this.state.itemExists) {
        doubleItem = <p className="error"><span>{this.state.itemExists.name}</span> is already on list.</p>
      }


    return(
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="container">
          <AddItem
            name={this.state.newItem.name}
            price={this.state.newItem.price}
            click={this.saveNewItemHandler}
            prepareName={(event) => this.prepareNameHandler(event)}
            preparePrice={(event) => this.preparePriceHandler(event)}/>
            {doubleItem}
        </div>
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
