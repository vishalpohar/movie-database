import {useState} from 'react'
import {Link} from 'react-router-dom'

import './index.css'

const Search = () => {
  const [query, setQuery] = useState('')

  const handleQueryChange = event => setQuery(event.target.value)

  return (
    <div className="input-wrapper">
      <input
        type="text"
        value={query}
        placeholder="Search Movie Name..."
        onChange={handleQueryChange}
        className="search-input"
      />
      <Link to={`/search?query=${query}`}>
        <button type="button" className="btn search-btn">
          Search
        </button>
      </Link>
    </div>
  )
}

export default Search
