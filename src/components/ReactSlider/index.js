import Slider from 'react-slick'
import OfferItem from '../OfferItem'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const ReactSlider = props => {
  const {offersList} = props
  const settings = {
    dots: true,
    autoplay: true,
    arrows: false,
  }
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {offersList.map(eachItem => (
          <OfferItem offerDetails={eachItem} key={eachItem.id} />
        ))}
      </Slider>
    </div>
  )
}

export default ReactSlider
