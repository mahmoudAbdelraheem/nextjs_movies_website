export const ApiConfig = {
  //! https://api.themoviedb.org/3/movie/popular?api_key=a1f18955374c022f6404ba14b7acd019
  //? api config
  baseUrl: "https://api.themoviedb.org/3/",
  apiKey: "?api_key=a1f18955374c022f6404ba14b7acd019",
  baseImagesUrl: "https://image.tmdb.org/t/p/w500",
  
  
  //? get popular movies
  popularMoviesUrl: "movie/popular",
  //? get top rated movies
  topRatedMoviesUrl: "movie/top_rated",
  //? get upcoming movies
  upcomingMoviesUrl: "movie/upcoming",
  //? get movies details by id
  //! https://api.themoviedb.org/3/movie/533535?api_key=a1f18955374c022f6404ba14b7acd019
  movieDetailsUrl: "movie/", // movie/{movie_id}?api_key=a1f18955374c022f6404ba14b7acd019

  //? search movies
  //! https://api.themoviedb.org/3/search/movie?api_key=a1f18955374c022f6404ba14b7acd019&query=matrix
  movieSearchUrl: "search/movie",

};
