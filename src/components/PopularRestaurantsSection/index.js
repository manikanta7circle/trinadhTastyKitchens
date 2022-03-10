import Cookies from 'js-cookie'

import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {FiChevronLeft, FiChevronRight} from 'react-icons/fi'
import {MdOutlineSort} from 'react-icons/md'

import Restaurant from '../Restaurant'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const limit = 9

class PopularRestaurantsSection extends Component {
  state = {
    restaurantsList: [],
    apiStatus: apiStatusConstants.initial,
    activePage: 1,
    activeSortOptionValue: sortByOptions[1].value,
  }

  componentDidMount() {
    this.getRestaurantsList()
  }

  onClickLeftPage = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState(
        prevState => ({activePage: prevState.activePage - 1}),
        this.getRestaurantsList,
      )
    }
  }

  onClickRightPage = () => {
    const {activePage} = this.state
    if (activePage < 4) {
      this.setState(
        prevState => ({activePage: prevState.activePage + 1}),
        this.getRestaurantsList,
      )
    }
  }

  onChangeSortOption = event => {
    this.setState(
      {activeSortOptionValue: event.target.value},
      this.getRestaurantsList,
    )
  }

  getRestaurantsList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)

    const {activePage, activeSortOptionValue} = this.state
    console.log(activePage)
    const offset = (activePage - 1) * limit

    const apiUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=${activeSortOptionValue}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = fetchedData.restaurants.map(eachItem => ({
        id: eachItem.id,
        imageUrl: eachItem.image_url,
        name: eachItem.name,
        cuisine: eachItem.cuisine,
        rating: eachItem.user_rating.rating,
        totalReviews: eachItem.user_rating.total_reviews,
      }))
      this.setState({
        restaurantsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderLoadingView = () => (
    <div className="offers-loader" testid="restaurants-list-loader">
      <Loader type="Puff" color="#F7931E" height="50" width="50" />
    </div>
  )

  renderRestaurantsList = () => {
    const {restaurantsList} = this.state
    return (
      <>
        <ul className="restaurants-list-container">
          {restaurantsList.map(eachItem => (
            <Restaurant key={eachItem.id} RestaurantDetails={eachItem} />
          ))}
        </ul>
        {this.renderPaginationControls()}
      </>
    )
  }

  renderRestaurants = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRestaurantsList()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderFilter = () => {
    const {activeSortOptionValue} = this.state
    return (
      <div className="filters-list-container">
        <p className="sort-text">
          <MdOutlineSort className="sort-icon" />
          Sort by
        </p>
        <select
          className="sort-by-select"
          value={activeSortOptionValue}
          onChange={this.onChangeSortOption}
        >
          {sortByOptions.map(eachItem => (
            <option
              key={eachItem.id}
              value={eachItem.value}
              className="select-option"
            >
              {eachItem.displayText}
            </option>
          ))}
        </select>
      </div>
    )
  }

  renderPaginationControls = () => {
    const {activePage} = this.state
    return (
      <div className="pagination-container">
        <button
          className="pagination-button"
          type="button"
          testid="pagination-left-button"
          onClick={this.onClickLeftPage}
        >
          <FiChevronLeft />
        </button>
        <span testid="active-page-number" className="active-page-text">
          {activePage} of 4
        </span>
        <button
          className="pagination-button"
          type="button"
          testid="pagination-right-button"
          onClick={this.onClickRightPage}
        >
          <FiChevronRight />
        </button>
      </div>
    )
  }

  render() {
    return (
      <div className="restaurants-section-container">
        <h1 className="popular-restaurants-heading">Popular Restaurants</h1>
        <div className="filter-container">
          <p className="popular-para">
            Select Your favourite restaurant special dish and make your day
            happy...
          </p>
          {this.renderFilter()}
        </div>
        {this.renderRestaurants()}
      </div>
    )
  }
}
export default PopularRestaurantsSection
