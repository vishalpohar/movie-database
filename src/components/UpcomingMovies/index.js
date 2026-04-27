import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'

import './index.css'

import MovieItem from '../MovieItem'
import Search from '../Search'

const apiConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const UpcomingMovies = () => {
  const [apiStatus, setApiStatus] = useState(apiConstants.initial)
  const [page, setPage] = useState(1)
  const [topRatedMovies, setTopRatedMovies] = useState([])

  const handleNext = () => setPage(prev => prev + 1)
  const handlePrevious = () => setPage(prev => (prev - 1 > 0 ? prev - 1 : 1))

  const apiKey = 'bcbb77a91c4be4ef5538befb53c81b3b'
  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      setApiStatus(apiConstants.loading)
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=${page}`,
      )

      if (response.ok) {
        const data = await response.json()
        console.log(data)
        const stucturedData = data.results.map(item => ({
          id: item.id,
          title: item.title,
          posterPath: item.poster_path,
          rating: item.vote_average,
        }))
        setTopRatedMovies(stucturedData)
        setApiStatus(apiConstants.success)
      } else {
        setApiStatus(apiConstants.failure)
      }
    }
    fetchTopRatedMovies()
  }, [page])

  const renderLoading = () => (
    <div className="loader-container" data-testid="loading">
      <Loader type="ThreeDots" color="#3b82f6" height={50} width={50} />
    </div>
  )

  const renderSuccess = () => (
    <>
      <h1 className="page-title">Upcoming</h1>
      <Search />
      <div className="page-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {topRatedMovies.map(movieDetails => (
          <MovieItem key={movieDetails.id} movieDetails={movieDetails} />
        ))}
      </div>
      <div className="pagination-controls">
        <button
          type="button"
          className="btn control-btn"
          onClick={handlePrevious}
        >
          Previous
        </button>
        <button type="button" className="btn control-btn" onClick={handleNext}>
          Next
        </button>
      </div>
    </>
  )

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

export default UpcomingMovies
