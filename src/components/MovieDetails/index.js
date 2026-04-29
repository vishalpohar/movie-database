import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Loader from 'react-loader-spinner'

import {getMovieDetails} from '../../redux/slices/movieDetailsSlice'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const MovieDetails = props => {
  const dispatch = useDispatch()

  const {movieData, castData, apiStatus} = useSelector(
    state => state.movieDetailsData,
  )

  const {match} = props
  const movieId = match.params.id

  useEffect(() => {
    dispatch(getMovieDetails(movieId))
  }, [dispatch, movieId])

  const renderLoading = () => (
    <div className="loader-container" data-testid="loading">
      <Loader type="ThreeDots" color="#3b82f6" height={50} width={50} />
    </div>
  )

  const renderSuccess = () => {
    const formatedRating = movieData.rating
      ? `${movieData.rating.toFixed(1)} ${'⭐'.repeat(
          Math.trunc(movieData.rating / 2),
        )}`
      : 'N/A'
    return (
      <div className="page-container">
        <div className="movie-details-container">
          <img
            className="movie-details-image"
            src={`https://image.tmdb.org/t/p/w500${movieData.posterPath}`}
            alt={movieData.title}
          />
          <h1 className="movie-details-title">{movieData.title}</h1>
          <div className="details-wrapper">
            <div className="details-item">
              <p className="details-label">Rating</p>
              <p className="details-value">{formatedRating}</p>
            </div>
            <div className="details-item">
              <p className="details-label">Duration</p>
              <p className="details-value">{movieData.duration} minutes</p>
            </div>
            <div className="details-item">
              <p className="details-label">Release Date</p>
              <p className="details-value">{movieData.releaseDate}</p>
            </div>
          </div>
          <div className="details-item">
            <p className="details-label">Overview</p>
            <p className="details-value">{movieData.overview}</p>
          </div>
        </div>
        <hr className="horizontal-line" />
        <div className="cast-container grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          {castData.map(castDetails => (
            <div key={castDetails.id} className="cast-card">
              <img
                className="cast-image"
                src={`https://image.tmdb.org/t/p/w500${castDetails.profilePath}`}
                alt={castDetails.name}
              />
              <h1 className="cast-name">{castDetails.name}</h1>
              <p className="cast-role">{castDetails.character}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderFailure = () => (
    <div className="failure-page">
      <h1 className="failure-message">Error, while Loading data!</h1>
    </div>
  )

  switch (apiStatus) {
    case apiConstants.loading:
      return renderLoading()
    case apiConstants.success:
      return renderSuccess()
    case apiConstants.failure:
      return renderFailure()
    default:
      return null
  }
}

export default MovieDetails
