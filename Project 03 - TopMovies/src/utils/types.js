export type TMovieListDetail = {
  poster_path: string,
  adult: boolean,
  overview: string,
  release_date: string,
  genre_ids: Array<number>,
  id: number,
  original_title: string,
  original_language: string,
  title: string,
  backdrop_path: string,
  popularity: number,
  vote_count: number,
  video: boolean,
  vote_average: number
}

export type TMoveListResult = {
  results: Array<TMovieListDetail>
}

export type TMovieDetails = {
  adult: boolean,
  backdrop_path: string,
  belongs_to_collection: ?any,
  budget: number,
  genres: Array<{
    id: number,
    name: string
  }>,
  homepage: ?string,
  id: number,
  imdb_id: string,
  original_language: string,
  original_title: string,
  overview: string,
  popularity: number,
  poster_path: string,
  production_companies: Array<{
    name: string,
    id: number
  }>,
  production_countries: Array<{
    iso_3166_1: string,
    name: string
  }>,
  release_date: string,
  revenue: number,
  runtime: number,
  spoken_languages: Array<{
    iso_3166_1: string,
    name: string
  }>,
  status: string,
  tagline: string,
  title: string,
  video: boolean,
  vote_average: number,
  vote_count: number
}
