import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import {Component} from 'react'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', showSubmitError: false, errorMsg: ''}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onClickGuestLogin = () => {
    this.setState({username: 'rahul', password: 'rahul@2021'}, this.submitForm)
  }

  submitForm = async event => {
    if (event !== undefined) {
      event.preventDefault()
    }
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="input-field"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="input-field"
          value={username}
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="main-container">
        <div className="md-login-image-container">
          <img
            src="https://res.cloudinary.com/dtmg369/image/upload/v1638964915/TastyKitchens/Rectangle_1457_1_ivwh76.png"
            alt="website login"
            className="md-login-image"
          />
        </div>
        <div className="left-container">
          <form className="form-container" onSubmit={this.submitForm}>
            <img
              src="https://res.cloudinary.com/dtmg369/image/upload/v1638027189/TastyKitchens/Frame_274_xnxdjh.png"
              className="website-logo"
              alt="website logo"
            />
            <h1 className="logo-text"> Tasty Kitchens</h1>
            <h1 className="login-heading">Login</h1>
            <div className="input-container">{this.renderUsernameField()}</div>
            <div className="input-container">{this.renderPasswordField()}</div>
            <div className="login-buttons-container">
              <button className="login-button" type="submit">
                Login
              </button>
              <p>or</p>
              <button
                className="login-button"
                type="button"
                onClick={this.onClickGuestLogin}
              >
                Guest Login
              </button>
            </div>
            {showSubmitError && <p className="error-message">{errorMsg}</p>}
          </form>
        </div>
        <div className="right-container">
          <img
            src="https://res.cloudinary.com/dtmg369/image/upload/v1638027212/TastyKitchens/Rectangle_1456_njstzh.png"
            className="website-login-image"
            alt="website login"
          />
        </div>
      </div>
    )
  }
}

export default LoginForm
