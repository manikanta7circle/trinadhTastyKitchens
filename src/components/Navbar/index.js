import Popup from 'reactjs-popup'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'
import './index.css'

const Navbar = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div className="navbar-container">
      <div className="logo-container">
        <Link to="/" className="nav-link-logo">
          <img
            src="https://res.cloudinary.com/dtmg369/image/upload/v1638027189/TastyKitchens/Frame_274_xnxdjh.png"
            alt="website logo"
            className="website-nav-logo"
          />
          <h1 className="website-logo-text"> Tasty Kitchens</h1>
        </Link>
      </div>
      <Popup
        modal
        trigger={
          <button className="md-menu-button" type="button">
            <GiHamburgerMenu size="20" />
          </button>
        }
        position="bottom center"
      >
        {close => (
          <div className="navigation-md">
            <ul className="nav-links-container">
              <li>
                <Link
                  to="/"
                  onClick={() => close()}
                  className="nav-link nav-link-active"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link to="/cart" onClick={() => close()} className="nav-link">
                  Cart
                </Link>
              </li>
            </ul>
            <button
              type="button"
              className="logout-button"
              onClick={onClickLogout}
            >
              Logout
            </button>
            <button
              className="popup-close-button"
              type="button"
              onClick={() => close()}
            >
              <AiFillCloseCircle size="20" />
            </button>
          </div>
        )}
      </Popup>
      <div className="navigation">
        <ul className="nav-links-container">
          <li>
            <Link to="/" className="nav-link nav-link-active">
              Home
            </Link>
          </li>
          <li>
            <Link to="/cart" className="nav-link">
              Cart
            </Link>
          </li>
        </ul>
        <button type="button" className="logout-button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default withRouter(Navbar)
