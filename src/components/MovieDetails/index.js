import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const MovieDetails = props => {
  const [apiStatus, setApiStatus] = useState(apiConstants.initial)
  const [movieDetails, setMovieDetails] = useState({})
  const [castList, setCastList] = useState([])
  const apiKey = 'bcbb77a91c4be4ef5538befb53c81b3b'
  useEffect(() => {
    const fetchMovieDetails = async () => {
      setApiStatus(apiConstants.loading)
      const {match} = props
      const movieId = match.params.id
      const movieResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`,
      )
      const castResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=en-US`,
      )

      if (movieResponse.ok && castResponse.ok) {
        const movieJson = await movieResponse.json()
        const castJson = await castResponse.json()
        console.log(movieJson)
        console.log(castJson)

        const movieData = {
          title: movieJson.title,
          posterPath: movieJson.poster_path,
          rating: movieJson.vote_average,
          duration: movieJson.runtime,
          releaseDate: movieJson.release_date,
          overview: movieJson.overview,
        }

        const castData = castJson.cast.map(item => ({
          id: item.id,
          profilePath: item.profile_path,
          name: item.original_name,
          character: item.character,
        }))
        setMovieDetails(movieData)
        setCastList(castData)
        setApiStatus(apiConstants.success)
      } else {
        setApiStatus(apiConstants.failure)
      }
    }
    fetchMovieDetails()
  }, [])

  const renderLoading = () => (
    <div className="loader-container" data-testid="loading">
      <Loader type="ThreeDots" color="#3b82f6" height={50} width={50} />
    </div>
  )

  const renderSuccess = () => {
    const formatedRating = movieDetails.rating
      ? `${movieDetails.rating.toFixed(1)} ${'⭐'.repeat(
          Math.trunc(movieDetails.rating / 2),
        )}`
      : 'N/A'
    return (
      <div className="page-container">
        <div className="movie-details-container">
          <img
            className="movie-details-image"
            src={`https://image.tmdb.org/t/p/w500${movieDetails.posterPath}`}
            alt={movieDetails.title}
          />
          <h1 className="movie-details-title">{movieDetails.title}</h1>
          <div className="details-wrapper">
            <div className="details-item">
              <p className="details-label">Rating</p>
              <p className="details-value">{formatedRating}</p>
            </div>
            <div className="details-item">
              <p className="details-label">Duration</p>
              <p className="details-value">{movieDetails.duration} minutes</p>
            </div>
            <div className="details-item">
              <p className="details-label">Release Date</p>
              <p className="details-value">{movieDetails.releaseDate}</p>
            </div>
          </div>
          <div className="details-item">
            <p className="details-label">Overview</p>
            <p className="details-value">{movieDetails.overview}</p>
          </div>
        </div>
        <hr className="horizontal-line" />
        <div className="cast-container grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          {castList.map(castDetails => (
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
