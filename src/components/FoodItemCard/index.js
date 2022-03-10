import {Component} from 'react'

import {BiRupee} from 'react-icons/bi'
import {BsStarFill, BsPlusSquare, BsDashSquare} from 'react-icons/bs'

import './index.css'

class FoodItemCard extends Component {
  state = {quantity: 1, showControls: false}

  disableControls = () => {
    this.setState(prevState => ({showControls: !prevState.showControls}))
  }

  onClickDecrementQuantity = () => {
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState(prevState => ({quantity: prevState.quantity - 1}))
    } else {
      this.disableControls()
    }
  }

  onClickIncrementQuantity = () => {
    const {quantity} = this.state
    const {foodData, addCartItem} = this.props
    const foodItemData = {
      cost: foodData.cost,
      quantity,
      id: foodData.id,
      imageUrl: foodData.imageUrl,
      name: foodData.name,
    }
    this.setState(
      prevState => ({quantity: prevState.quantity + 1}),
      addCartItem(foodItemData),
    )
  }

  onClickAdd = () => {
    this.setState({showControls: true})
  }

  render() {
    const {foodData} = this.props
    const {name, cost, rating, imageUrl} = foodData
    const {quantity, showControls} = this.state
    return (
      <li className="food-item-card-container" testid="foodItem">
        <img src={imageUrl} alt="food item" className="food-item-card-image" />
        <div className="food-item-details-container">
          <h1 className="food-item-name">{name}</h1>
          <p className="food-item-cost">
            <BiRupee />
            {cost}
          </p>
          <p className="food-item-rating">
            <BsStarFill className="rating-icon" />
            {rating}
          </p>
          {showControls ? (
            <div className="item-quantity-controls">
              <button
                type="button"
                className="counter-button"
                onClick={this.onClickDecrementQuantity}
                testid="decrement-count"
              >
                <BsDashSquare />
              </button>
              <p className="item-quantity" testid="active-count">
                {quantity}
              </p>
              <button
                type="button"
                className="counter-button"
                onClick={this.onClickIncrementQuantity}
                testid="increment-count"
              >
                <BsPlusSquare />
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="add-to-cart-button"
              onClick={this.onClickAdd}
            >
              ADD
            </button>
          )}
        </div>
      </li>
    )
  }
}

export default FoodItemCard
