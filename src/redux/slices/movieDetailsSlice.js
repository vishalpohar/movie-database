import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const apiKey = process.env.REACT_APP_TMDB_API_KEY

export const getMovieDetails = createAsyncThunk(
  'movies/getMovieDetails',
  async movieId => {
    const movieResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`,
    )
    const castResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=en-US`,
    )

    if (!movieResponse.ok || !castResponse.ok) throw new Error('Failed')
    const movieJson = await movieResponse.json()
    const castJson = await castResponse.json()

    return {
      movieData: {
        title: movieJson.title,
        posterPath: movieJson.poster_path,
        rating: movieJson.vote_average,
        duration: movieJson.runtime,
        releaseDate: movieJson.release_date,
        overview: movieJson.overview,
      },
      castData: castJson.cast.map(item => ({
        id: item.id,
        profilePath: item.profile_path,
        name: item.original_name,
        character: item.character,
      })),
    }
  },
)

const movieDetailsSlice = createSlice({
  name: 'movieDetails',
  initialState: {movieData: {}, castData: [], apiStatus: 'INITIAL'},
  extraReducers: builder => {
    builder
      .addCase(getMovieDetails.pending, state => {
        state.apiStatus = 'LOADING'
      })
      .addCase(getMovieDetails.fulfilled, (state, action) => {
        state.apiStatus = 'SUCCESS'
        state.movieData = action.payload.movieData
        state.castData = action.payload.castData
      })
      .addCase(getMovieDetails.rejected, state => {
        state.apiStatus = 'FAILURE'
      })
  },
})

export default movieDetailsSlice.reducer
