
export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const api_key = "685814648889cc009fd6e5dd5ba7986b"
export const baseURL = "https://api.themoviedb.org/3/movie";
export const baseURLSearch = "https://api.themoviedb.org/3/search/movie";
export const tmdbAPI = {
  getMovieList: (type, page = 1) => `${baseURL}/${type}?api_key=${api_key}&page=${page}`,
  getMovieDetails: (movieId) => `${baseURL}/${movieId}?api_key=${api_key}`,
  getMovieMeta: (movieId, type) => `${baseURL}/${movieId}/${type}?api_key=${api_key}`,
  getMovieSearch: (query, page) => `${baseURLSearch}?api_key=${api_key}&query=${query}&page=${page}`,
  imageOriginal: (url) => `https://image.tmdb.org/t/p/original${url}`,
  image500: (url) => `https://image.tmdb.org/t/p/w500/${url}`
}

