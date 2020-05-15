import React from 'react';
import './AddItem.css';

const addItem = (props) => {
  return(
    <div className="new-item">
      <div className="wrapper">
        <input type="text" value={props.name} onChange={props.prepareName} placeholder="Name"/>
        <input type="number" value={props.price} onChange={props.preparePrice} placeholder="Price"/>
      </div>
      <button type="button" onClick={props.click}>Add</button>
    </div>
  )
}

export default addItem;