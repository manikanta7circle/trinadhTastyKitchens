import Cookies from 'js-cookie'

import {Component} from 'react'
import Loader from 'react-loader-spinner'
import ReactSlider from '../ReactSlider'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}
class OffersSection extends Component {
  state = {offers: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getOffers()
  }

  getOffers = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.offers.map(eachItem => ({
        id: eachItem.id,
        imageUrl: eachItem.image_url,
      }))
      this.setState({
        offers: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderOffersView = () => {
    const {offers} = this.state
    return <ReactSlider offersList={offers} />
  }

  renderLoadingView = () => (
    <div className="offers-loader" testid="restaurants-offers-loader">
      <Loader type="Puff" color="#F7931E" height="50" width="50" />
    </div>
  )

  renderOffers = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderOffersView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div className="offers-section">{this.renderOffers()}</div>
  }
}

export default OffersSection
