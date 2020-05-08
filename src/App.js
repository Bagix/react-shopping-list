import React, { Component } from 'react';
import ShopItem from './Components/ShopItem/ShopItem';
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
    ]
  }

  render() {
    let shopList = 
      <ul>
        {this.state.shopList.map(item => {
          return (
            <ShopItem item={item}/>
          )
        })}
      </ul>


    return(
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        {shopList}
    </div>
    )
  }
}

export default App;
