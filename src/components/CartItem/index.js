import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'

import './index.css'

const CartItem = props => {
  const {cartItemData, incrementQuantity, decrementQuantity} = props
  const {imageUrl, name, cost, id, quantity} = cartItemData
  const price = cost * quantity

  const onClickItemIncrement = () => {
    incrementQuantity(id)
  }

  const onClickItemDecrement = () => {
    decrementQuantity(id)
  }

  return (
    <li className="cart-list-item" testid="cartItem">
      <img src={imageUrl} alt="cart" className="cart-item-image" />
      <div className="cart-item-details-container">
        <h1 className="cart-item-name">{name}</h1>
        <div className="cart-item-quantity-controls">
          <button
            type="button"
            className="counter-button"
            onClick={onClickItemDecrement}
            testid="decrement-quantity"
          >
            <BsDashSquare />
          </button>
          <p className="item-quantity" testid="item-quantity">
            {quantity}
          </p>
          <button
            type="button"
            className="counter-button"
            onClick={onClickItemIncrement}
            testid="increment-quantity"
          >
            <BsPlusSquare />
          </button>
        </div>
        <p className="cart-item-cost">{`${price}.00`}</p>
      </div>
    </li>
  )
}

export default CartItem
