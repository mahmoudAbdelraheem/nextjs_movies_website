import { popularMovies } from "@/data/popular.js";
import { v4 as uuid } from "uuid";

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json({ results: popularMovies });
  } else if (req.method === "POST") {
    const newMovie = req.body;

    const completeMovie = {
      adult: newMovie.adult || false,
      backdrop_path: newMovie.backdrop_path || "",
      genre_ids: newMovie.genre_ids || [],
      id: uuid(),
      original_language: newMovie.original_language || "en",
      original_title: newMovie.original_title || "",
      overview: newMovie.overview || "",
      popularity: +newMovie.popularity || 0,
      poster_path: newMovie.poster_path || "",
      release_date: newMovie.release_date || "",
      title: newMovie.title || "",
      video: newMovie.video || false,
      vote_average: +newMovie.vote_average || 0,
      vote_count: +newMovie.vote_count || 0,
    };

    popularMovies.push(completeMovie);
    res.status(201).json({ results: popularMovies });
  } else if (req.method === "PUT") {
    const newMovie = req.body;

    const index = popularMovies.findIndex(
      (movie) => movie.id.toString() === newMovie.id.toString()
    );

    if (index === -1) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const completeMovie = {
      adult: newMovie.adult || false,
      backdrop_path: newMovie.backdrop_path || "",
      genre_ids: newMovie.genre_ids || [],
      id: +newMovie.id,
      original_language: newMovie.original_language || "en",
      original_title: newMovie.original_title || "",
      overview: newMovie.overview || "",
      popularity: +newMovie.popularity || 0,
      poster_path: newMovie.poster_path || "",
      release_date: newMovie.release_date || "",
      title: newMovie.title || "",
      video: newMovie.video || false,
      vote_average: +newMovie.vote_average || 0,
      vote_count: +newMovie.vote_count || 0,
    };

    popularMovies[index] = completeMovie;
    res.status(200).json({ results: popularMovies });
  } else {
    res.setHeader("Allow", ["GET", "POST", "PUT"]);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
