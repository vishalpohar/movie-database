import {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'

import './index.css'

const Search = () => {
  const [query, setQuery] = useState('')
  const history = useHistory()

  const handleQueryChange = event => setQuery(event.target.value)

  const handleFormSubmit = event => {
    event.preventDefault()

    if (query.trim() !== '') {
      history.push(`/search?query=${query}`)
    }
  }

  return (
    <form className="input-wrapper" onSubmit={handleFormSubmit}>
      <input
        type="text"
        value={query}
        placeholder="Search Movie Name..."
        onChange={handleQueryChange}
        className="search-input"
      />
      <Link to={`/search?query=${query}`}>
        <button type="submit" className="btn search-btn">
          Search
        </button>
      </Link>
    </form>
  )
}

export default Search
