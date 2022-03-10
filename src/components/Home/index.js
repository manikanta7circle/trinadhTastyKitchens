import {Component} from 'react'

import Navbar from '../Navbar'
import OffersSection from '../OffersSection'
import PopularRestaurantsSection from '../PopularRestaurantsSection'
import Footer from '../Footer'

class Home extends Component {
  render() {
    return (
      <div className="home-container">
        <Navbar />
        <OffersSection />
        <PopularRestaurantsSection />
        <Footer />
      </div>
    )
  }
}

export default Home
