const API_KEY = process.env.TMDB_API_KEY || '5b088f4b0e39fa8bc5c9d015d9706547'
const ENDPOINT = (url: string): string => `https://api.themoviedb.org/3/movie/${url}`

type TopRatedOptions = {
  page: number
}

/* https://developers.themoviedb.org/3/movies/get-top-rated-movies */
export const fetchTopRated = (options: TopRatedOptions) => {
  return fetch(ENDPOINT(`top_rated?api_key=${API_KEY}&language=en-US&page=${options.page}`))
    .then(res => res.json())
}
