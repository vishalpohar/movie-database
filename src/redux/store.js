// import {createStore, applyMiddleware} from 'redux'
// import thunk from 'redux-thunk'
// import rootReducer from './reducers'

// const store = createStore(rootReducer, applyMiddleware(thunk))

// export default store

import {configureStore} from '@reduxjs/toolkit'
import popularMoviesReducer from './slices/popularMoviesSlice'
import topRatedMoviesReducer from './slices/topRatedMoviesSlice'
import upcomingMoviesReducer from './slices/upcomingMoviesSlice'
import searchedMoviesReducer from './slices/searchedMoviesSlice'
import movieDetailsReducer from './slices/movieDetailsSlice'

const store = configureStore({
  reducer: {
    popularMoviesData: popularMoviesReducer,
    topRatedMoviesData: topRatedMoviesReducer,
    upcomingMoviesData: upcomingMoviesReducer,
    searchedMoviesData: searchedMoviesReducer,
    movieDetailsData: movieDetailsReducer,
  },
})

export default store
