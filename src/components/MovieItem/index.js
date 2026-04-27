import {Link} from 'react-router-dom'

import './index.css'

const MovieItem = props => {
  const {movieDetails} = props
  const {id, title, rating, posterPath} = movieDetails
  const formatedRating = rating
    ? `${rating.toFixed(1)} ${'⭐'.repeat(Math.trunc(rating / 2))}`
    : 'N/A'

  return (
    <div className="movie-card">
      <img
        className="movie-image"
        src={`https://image.tmdb.org/t/p/w500${posterPath}`}
        alt={title}
      />
      <h1 className="movie-title">{title}</h1>
      <p className="rating">Rating: {formatedRating}</p>
      <Link to={`/movie-details/${id}`}>
        <button className="btn view-details-btn" type="button">
          View Details
        </button>
      </Link>
    </div>
  )
}

export default MovieItem
