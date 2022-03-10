import Cookies from 'js-cookie'
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import RestaurantDetailsCard from '../RestaurantDetailsCard'
import FoodItemCard from '../FoodItemCard'

import Navbar from '../Navbar'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

class RestaurantDetails extends Component {
  state = {
    restaurantDetails: {},
    apiStatus: apiStatusConstants.initial,
    foodItemsList: [],
    cartList:
      JSON.parse(localStorage.getItem('cartData')) !== null
        ? JSON.parse(localStorage.getItem('cartData'))
        : [],
  }

  componentDidMount() {
    this.getRestaurantDetails()
  }

  getFormattedData = data => ({
    id: data.id,
    imageUrl: data.image_url,
    name: data.name,
    cuisine: data.cuisine,
    location: data.location,
    rating: data.rating,
    reviewsCount: data.reviews_count,
    costForTwo: data.cost_for_two,
  })

  getFormattedFoodItemData = data => ({
    foodItemImage: data.image_url,
    id: data.id,
    name: data.name,
    cost: data.cost,
    rating: data.rating,
    imageUrl: data.image_url,
  })

  getRestaurantDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()

      const updatedData = this.getFormattedData(fetchedData)
      const foodItems = fetchedData.food_items.map(eachItem =>
        this.getFormattedFoodItemData(eachItem),
      )
      this.setState({
        restaurantDetails: updatedData,
        foodItemsList: foodItems,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  setLocalStorage = () => {
    const {cartList} = this.state
    localStorage.setItem('cartData', JSON.stringify(cartList))
  }

  addItemToCartList = itemData => {
    const {cartList} = this.state
    const foodItemObject = cartList.find(
      eachItem => eachItem.id === itemData.id,
    )
    if (foodItemObject) {
      this.setState(
        prevState => ({
          cartList: prevState.cartList.map(eachItem => {
            if (eachItem.id === foodItemObject.id) {
              const updatedQuantity = eachItem.quantity + itemData.quantity
              return {...eachItem, quantity: updatedQuantity}
            }
            return eachItem
          }),
        }),
        this.setLocalStorage,
      )
    } else {
      const updatedItemsList = [...cartList, itemData]
      this.setState({cartList: updatedItemsList}, this.setLocalStorage)
    }
  }

  renderFoodItems = () => {
    const {foodItemsList, cartList} = this.state
    console.log(cartList)
    return (
      <ul className="restaurant-food-items-container">
        {foodItemsList.map(eachItem => (
          <FoodItemCard
            key={eachItem.id}
            foodData={eachItem}
            addCartItem={this.addItemToCartList}
          />
        ))}
      </ul>
    )
  }

  renderSuccessView = () => {
    const {restaurantDetails} = this.state
    return (
      <>
        <RestaurantDetailsCard details={restaurantDetails} />
        {this.renderFoodItems()}
      </>
    )
  }

  renderLoadingView = () => (
    <div className="offers-loader" testid="restaurant-details-loader">
      <Loader type="Puff" color="#F7931E" height="50" width="50" />
    </div>
  )

  renderRestaurantItemsAndDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="restaurant-details-container">
        <Navbar />
        {this.renderRestaurantItemsAndDetails()}
      </div>
    )
  }
}

export default RestaurantDetails
