import {Switch, Route} from 'react-router-dom'

import './App.css'

import Navbar from './components/Navbar'
import PopularMovies from './components/PopularMovies'
import TopRatedMovies from './components/TopRatedMovies'
import UpcomingMovies from './components/UpcomingMovies'
import SearchedMovies from './components/SearchedMovies'
import MovieDetails from './components/MovieDetails'

// write your code here
const App = () => (
  <div className="main-container">
    <Navbar />
    <div className="content">
      <Switch>
        <Route exact path="/" component={PopularMovies} />
        <Route exact path="/top-rated" component={TopRatedMovies} />
        <Route exact path="/upcoming" component={UpcomingMovies} />
        <Route exact path="/search" component={SearchedMovies} />
        <Route exact path="/movie-details/:id" component={MovieDetails} />
      </Switch>
    </div>
  </div>
)

export default App
