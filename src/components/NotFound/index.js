import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-page-container">
    <img
      src="https://res.cloudinary.com/dtmg369/image/upload/v1638160028/TastyKitchens/erroring_1_qqayc2.png"
      alt="not found"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-description">
      We are sorry, the page you requested could not be found.
      <br />
      Please go back to the homepage
    </p>
    <Link to="/" className="not-found-home-link">
      <button type="button" className="home-page-button">
        Home Page
      </button>
    </Link>
  </div>
)

export default NotFound
