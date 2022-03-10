import {BsStarFill} from 'react-icons/bs'
import {BiRupee} from 'react-icons/bi'
import './index.css'

const RestaurantDetailsCard = props => {
  const {details} = props
  const {
    imageUrl,
    name,
    cuisine,
    location,
    rating,
    reviewsCount,
    costForTwo,
  } = details
  return (
    <div className="restaurant-details-card">
      <div className="restaurant-details-card-container">
        <img
          src={imageUrl}
          className="restaurant-card-image"
          alt="restaurant"
        />
        <div className="restaurant-food-details-container">
          <h1 className="restaurant-details-name">{name}</h1>
          <p className="restaurant-details-cuisine">{cuisine}</p>
          <p className="restaurant-details-location">{location}</p>
          <div className="restaurant-details-ratings-and-cost-container">
            <div className="restaurant-details-rating-container">
              <p className="restaurant-details-rating">
                <BsStarFill className="rating-icon" />
                {rating}
              </p>
              <p className="restaurant-total-ratings">{`${reviewsCount}+ Ratings`}</p>
            </div>
            <div className="restaurant-details-cost-container">
              <p className="restaurant-details-cost">
                <BiRupee />
                {costForTwo}
              </p>
              <p className="restaurant-details-cost-text">Cost for two</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RestaurantDetailsCard
