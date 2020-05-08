import React from 'react';

const shopItem = (props) => {
  return(
    <li>
      {props.item.name}
      {props.item.price}
    </li>
  )
}

export default shopItem