import { ApiConfig } from "@/api_config";
import MovieCard from "@/components/MovieCard";

function TopRated({ movies }) {
  console.log(movies);
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6  pb-12 p-6 bg-gray-400">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
}

export default TopRated;

export async function getServerSideProps() {
  var res = await fetch(
    ApiConfig.baseUrl + ApiConfig.topRatedMoviesUrl + ApiConfig.apiKey
  );
  var data = await res.json();
  return {
    props: { movies: data.results },
  };
}
