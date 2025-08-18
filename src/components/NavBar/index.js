import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'
import {BsBriefcaseFill} from 'react-icons/bs'
import Cookies from 'js-cookie'

import './index.css'

const NavBar = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="nav-contanier">
      <div className="app-icon">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
      </div>
      <ul className="nav-links desktop-view">
        <li className="nav-link">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-link">
          <Link to="/jobs">Jobs</Link>
        </li>
      </ul>
      <div>
        <button
          className="logout-btn desktop-view"
          type="button"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </div>
      <ul className="mobile-view">
        <li className="nav-link">
          <Link to="/">
            <AiFillHome size={20} color="white" />
          </Link>
        </li>
        <li className="nav-link">
          <Link to="/jobs">
            <BsBriefcaseFill size={20} color="white" />
          </Link>
        </li>
        <li>
          <button className="mobile-view" type="button" onClick={onClickLogout}>
            <FiLogOut size={20} color="#ffffff" />
          </button>
        </li>
      </ul>
    </nav>
  )
}
export default withRouter(NavBar)
