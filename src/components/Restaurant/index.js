import {Link} from 'react-router-dom'

import {BsStarFill} from 'react-icons/bs'

import './index.css'

const Restaurant = props => {
  const {RestaurantDetails} = props
  const {id, imageUrl, name, rating, totalReviews, cuisine} = RestaurantDetails
  return (
    <Link to={`/restaurant/${id}`} className="link-item">
      <li className="Restaurant-item-container" testid="restaurant-item">
        <img
          src={imageUrl}
          alt="restaurant"
          className="restaurant-item-image"
        />
        <div className="restaurants-details-container">
          <h1 className="restaurants-name">{name}</h1>
          <p className="food-type">{cuisine}</p>
          <div className="restaurant-ratings-container">
            <BsStarFill className="rating-icon" />
            <p className="rating-text">
              {`${rating}`}
              <span className="total-reviews-text">{`(${totalReviews} ratings)`}</span>
            </p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default Restaurant
