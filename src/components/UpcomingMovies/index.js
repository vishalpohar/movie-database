import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Loader from 'react-loader-spinner'

import {getUpcomingMovies} from '../../redux/slices/upcomingMoviesSlice'

import MovieItem from '../MovieItem'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const UpcomingMovies = () => {
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)

  const {movies, apiStatus} = useSelector(state => state.upcomingMoviesData)

  const handleNext = () => setPage(prev => prev + 1)
  const handlePrevious = () => setPage(prev => (prev - 1 > 0 ? prev - 1 : 1))

  useEffect(() => {
    dispatch(getUpcomingMovies(page))
  }, [dispatch, page])

  const renderLoading = () => (
    <div className="loader-container" data-testid="loading">
      <Loader type="ThreeDots" color="#3b82f6" height={50} width={50} />
    </div>
  )

  const renderSuccess = () => (
    <>
      <h1 className="page-title">Upcoming</h1>
      <div className="page-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {movies.map(movieDetails => (
          <MovieItem key={movieDetails.id} movieDetails={movieDetails} />
        ))}
      </div>
    </>
  )

  const renderFailure = () => (
    <div className="failure-page">
      <h1 className="failure-message">Error, while Loading data!</h1>
    </div>
  )

  const renderContent = () => {
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

  return (
    <>
      {renderContent()}
      <div className="pagination-controls">
        <button
          type="button"
          className="btn control-btn"
          data-testid="prev"
          aria-label="Prev"
          onClick={handlePrevious}
        >
          Prev
        </button>
        <p className="page-number">{page}</p>
        <button
          type="button"
          className="btn control-btn"
          data-testid="next"
          aria-label="Next"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </>
  )
}

export default UpcomingMovies
