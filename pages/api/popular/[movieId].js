import { popularMovies } from "@/data/popular";

export default function handler(req, res) {
  const { movieId } = req.query;
  const index = popularMovies.findIndex((movie) => {
    return movie.id.toString() === movieId.toString();
  });
  popularMovies.splice(index, 1);
  res.status(200).json({ results: popularMovies });
}
