import React from 'react';

const addItem = (props) => {
  return(
    <div>
      <input type="text" />
      <input type="number" />
      <button type="button" onClick={props.click}>Add</button>
    </div>
  )
}

export default addItem