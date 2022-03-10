import {Link} from 'react-router-dom'
import {Component} from 'react'

import {BiRupee} from 'react-icons/bi'

import Navbar from '../Navbar'
import CartItem from '../CartItem'
import Footer from '../Footer'

import './index.css'

class Cart extends Component {
  state = {
    cartItems:
      JSON.parse(localStorage.getItem('cartData')) !== null
        ? JSON.parse(localStorage.getItem('cartData'))
        : [],
    placeOrder: false,
  }

  updateLocalStorage = () => {
    const {cartItems} = this.state
    localStorage.setItem('cartData', JSON.stringify(cartItems))
  }

  removeCartItem = id => {
    const {cartItems} = this.state
    const updatedCartItems = cartItems.filter(each => each.id !== id)
    this.setState({cartItems: updatedCartItems}, this.updateLocalStorage)
  }

  incrementQuantity = id => {
    this.setState(
      prevState => ({
        cartItems: prevState.cartItems.map(eachItem => {
          if (id === eachItem.id) {
            const updatedQuantity = eachItem.quantity + 1
            return {...eachItem, quantity: updatedQuantity}
          }
          return eachItem
        }),
      }),
      this.updateLocalStorage,
    )
  }

  decrementQuantity = id => {
    const {cartItems} = this.state
    const cartItemObject = cartItems.find(eachItem => eachItem.id === id)
    if (cartItemObject.quantity > 1) {
      this.setState(
        prevState => ({
          cartItems: prevState.cartItems.map(eachItem => {
            if (id === eachItem.id) {
              const updatedQuantity = eachItem.quantity - 1
              return {...eachItem, quantity: updatedQuantity}
            }
            return eachItem
          }),
        }),
        this.updateLocalStorage,
      )
    } else {
      this.removeCartItem(id)
    }
  }

  onClickPlaceOrder = () => {
    this.setState(
      prevState => ({placeOrder: !prevState.placeOrder}),
      localStorage.removeItem('cartData'),
    )
  }

  renderPlaceOrder = () => (
    <div className="place-order-container">
      <img
        src="https://res.cloudinary.com/dtmg369/image/upload/v1638158218/TastyKitchens/Vector_zaeh5a.png"
        alt="success"
        className="success-image"
      />
      <h1 className="success-text">Payment Successful</h1>
      <p className="success-description">
        Thank you for ordering Your payment is successfully completed.
      </p>
      <Link to="/" className="link-home">
        <button type="button" className="go-to-home-button">
          Go To Home Page
        </button>
      </Link>
    </div>
  )

  renderEmptyCartView = () => (
    <div className="empty-view-container">
      <img
        src="https://res.cloudinary.com/dtmg369/image/upload/v1638158544/TastyKitchens/cooking_1_g78u8t.png"
        alt="empty cart"
        className="empty-image"
      />
      <h1 className="empty-heading">No Order Yet!</h1>
      <p className="Empty-description">
        Your cart is empty. Add something from the menu.
      </p>
      <Link to="/" className="link-home">
        <button type="button" className="order-now-button">
          Order Now
        </button>
      </Link>
    </div>
  )

  renderSummary = () => {
    const {cartItems} = this.state
    let total = 0
    cartItems.forEach(eachItem => {
      total += eachItem.quantity * eachItem.cost
    })
    return (
      <>
        <div className="order-summary-container">
          <h1 className="oder-summary-text">Order Total: </h1>
          <p className="total-price" testid="total-price">
            <BiRupee />
            {`${total}.00`}
          </p>
        </div>
        <div className="place-order-button-container">
          <button
            type="button"
            className="place-order-button"
            onClick={this.onClickPlaceOrder}
          >
            Place Order
          </button>
        </div>
      </>
    )
  }

  renderCartList = () => {
    const {cartItems} = this.state
    const showEmptyView = cartItems.length === 0
    if (showEmptyView) {
      return this.renderEmptyCartView()
    }
    return (
      <div className="cart-container">
        <div className="cart-list-container">
          <div className="headings-container">
            <p className="heading-text heading-text-size1"> Item</p>
            <p className="heading-text heading-text-size2"> Quantity</p>
            <p className="heading-text heading-text-size3"> Price</p>
          </div>
          <ul className="cart-items-list-container">
            {cartItems.map(eachItem => (
              <CartItem
                key={eachItem.id}
                cartItemData={eachItem}
                incrementQuantity={this.incrementQuantity}
                decrementQuantity={this.decrementQuantity}
              />
            ))}
          </ul>
          {this.renderSummary()}
        </div>
      </div>
    )
  }

  render() {
    const {placeOrder} = this.state
    return (
      <div className="cart-items-page-container">
        <Navbar />
        {placeOrder ? this.renderPlaceOrder() : this.renderCartList()}
        <Footer />
      </div>
    )
  }
}

export default Cart
