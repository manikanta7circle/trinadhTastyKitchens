import './index.css'

const OfferItem = props => {
  const {offerDetails} = props
  const {imageUrl} = offerDetails
  return (
    <div className="container">
      <img src={imageUrl} alt="offer" className="offer-image" />
    </div>
  )
}

export default OfferItem
