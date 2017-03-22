const API_KEY = process.env.TMDB_API_KEY || '5b088f4b0e39fa8bc5c9d015d9706547'
const ENDPOINT = (url: string, query: string): string => `https://api.themoviedb.org/3/movie/${url}?api_key=${API_KEY}&${query}`

type TopRatedOptions = {
  page: number
}

type TMovieDetailsOptions = {
  id: string
}

/* https://developers.themoviedb.org/3/movies/get-top-rated-movies */
export const fetchTopRated = (options: TopRatedOptions) => {
  return fetch(ENDPOINT(`top_rated`, `language=en-US&page=${options.page}`))
    .then(res => res.json())
}

/* https://developers.themoviedb.org/3/movies/get-movie-details */
export const fetchMovieDetails = (options: TMovieDetailsOptions) => {
  return fetch(ENDPOINT(`movie/${options.id}`, `language=en-US`))
    .then(res => res.json())
}
