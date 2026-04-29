import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const apiKey = process.env.REACT_APP_TMDB_API_KEY

export const getTopRatedMovies = createAsyncThunk(
  'movies/getTopRated',
  async page => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=${page}`,
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

const topRatedMoviesSlice = createSlice({
  name: 'topRatedMovies',
  initialState: {movies: [], apiStatus: 'INITIAL'},
  extraReducers: builder => {
    builder
      .addCase(getTopRatedMovies.pending, state => {
        state.apiStatus = 'LOADING'
      })
      .addCase(getTopRatedMovies.fulfilled, (state, action) => {
        state.apiStatus = 'SUCCESS'
        state.movies = action.payload.movies
      })
      .addCase(getTopRatedMovies.rejected, state => {
        state.apiStatus = 'FAILURE'
      })
  },
})

export default topRatedMoviesSlice.reducer
