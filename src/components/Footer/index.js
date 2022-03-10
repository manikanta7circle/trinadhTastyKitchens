import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="Footer-container">
    <div className="footer-logo-container">
      <img
        src="https://res.cloudinary.com/dtmg369/image/upload/v1638094340/TastyKitchens/Group_7420_cxqdyb.png"
        className="footer-logo"
        alt="website-footer-logo"
      />
      <h1 className="footer-logo-text">Tasty Kitchens</h1>
    </div>
    <p className="footer-description">
      The only thing we are serious about is food. Contact us on
    </p>
    <div className="social-media-icons-container">
      <FaPinterestSquare
        className="social-media-icon"
        testid="pintrest-social-icon"
      />
      <FaInstagram
        className="social-media-icon"
        testid="instagram-social-icon"
      />
      <FaTwitter className="social-media-icon" testid="twitter-social-icon" />
      <FaFacebookSquare
        className="social-media-icon"
        testid="facebook-social-icon"
      />
    </div>
  </div>
)

export default Footer
