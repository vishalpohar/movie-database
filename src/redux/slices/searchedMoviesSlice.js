import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const apiKey = process.env.REACT_APP_TMDB_API_KEY

export const getSearchedMovies = createAsyncThunk(
  'movies/getSearched',
  async ({movieName, page}) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${movieName}&page=${page}`,
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

const searchedMoviesSlice = createSlice({
  name: 'searchMoviesData',
  initialState: {movies: [], apiStatus: 'INITIAL'},
  extraReducers: builder => {
    builder
      .addCase(getSearchedMovies.pending, state => {
        state.apiStatus = 'LOADING'
      })
      .addCase(getSearchedMovies.fulfilled, (state, action) => {
        state.apiStatus = 'SUCCESS'
        state.movies = action.payload.movies
      })
      .addCase(getSearchedMovies.rejected, state => {
        state.apiStatus = 'FAILURE'
      })
  },
})

export default searchedMoviesSlice.reducer
