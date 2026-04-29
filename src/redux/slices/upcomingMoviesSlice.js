import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const apiKey = process.env.REACT_APP_TMDB_API_KEY

export const getUpcomingMovies = createAsyncThunk(
  'movies/getUpcoming',
  async page => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=${page}`,
    )

    if (!response.ok) throw new Error('Failed')

    const data = await response.json()
    return {
      movies: data.results.map(item => ({
        id: item.id,
        title: item.title,
        posterPath: item.poster_path,
        rating: item.vote_average,
      })),
    }
  },
)

const upcomingMoviesSlice = createSlice({
  name: 'upcomingMoviesData',
  initialState: {movies: [], apiStatus: 'INITIAL'},
  extraReducers: builder => {
    builder
      .addCase(getUpcomingMovies.pending, state => {
        state.apiStatus = 'LOADING'
      })
      .addCase(getUpcomingMovies.fulfilled, (state, action) => {
        state.apiStatus = 'SUCCESS'
        state.movies = action.payload.movies
      })
      .addCase(getUpcomingMovies.rejected, state => {
        state.apiStatus = 'FAILURE'
      })
  },
})

export default upcomingMoviesSlice.reducer
