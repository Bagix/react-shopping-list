import React from 'react';

const addItem = (props) => {
  return(
    <div>
      <input type="text" value={props.name} onChange={props.prepareName}/>
      <input type="number" value={props.price} onChange={props.preparePrice}/>
      <button type="button" onClick={props.click}>Add</button>
    </div>
  )
}

export default addItem;