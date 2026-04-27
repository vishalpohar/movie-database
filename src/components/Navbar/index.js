import {useState} from 'react'
import {Link, withRouter} from 'react-router-dom'

import Search from '../Search'

import './index.css'

const navList = [
  {id: 'POPULAR', name: 'Popular', path: '/'},
  {id: 'Top_RATED', name: 'Top Rated', path: '/top-rated'},
  {id: 'UPCOMING', name: 'Upcoming', path: '/upcoming'},
]

const Navbar = props => {
  const [showLinks, setShowLinks] = useState(false)
  const {location} = props
  const activeLink = location.pathname

  const toggleShowLinks = () => setShowLinks(prev => !prev)

  return (
    <nav className="nav-container">
      <div className="nav-bar">
        <Link to="/" className="nav-link">
          <h1 className="title">movieDB</h1>
        </Link>
        <Search />
        <ul className="nav-links-list">
          {navList.map(item => (
            <li key={item.id}>
              <Link
                className="nav-link"
                to={item.path}
                onClick={toggleShowLinks}
              >
                <h1
                  className={`link-text ${
                    activeLink === item.path && 'active-link'
                  }`}
                >
                  {item.name}
                </h1>
              </Link>
            </li>
          ))}
        </ul>
        <button type="button" className="menu-btn" onClick={toggleShowLinks}>
          Menu
        </button>
      </div>
      {showLinks && (
        <ul className="nav-links-list-sm">
          {navList.map(item => (
            <li key={item.id}>
              <Link
                className="nav-link"
                to={item.path}
                onClick={toggleShowLinks}
              >
                <h1
                  className={`link-text ${
                    activeLink === item.path && 'active-link'
                  }`}
                >
                  {item.name}
                </h1>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}

export default withRouter(Navbar)
