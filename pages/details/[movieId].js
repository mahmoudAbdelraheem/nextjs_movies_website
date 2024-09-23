import { ApiConfig } from "@/api_config";
import { useRouter } from "next/router";
import Image from "next/image";

function MovieDetails({ movie }) {
  const { push } = useRouter();

  return (
    <>
      <div className="relative bg-gray-900 text-white h-96">
        {movie.backdrop_path && (
          <Image
            src={`${ApiConfig.baseImagesUrl}${movie.backdrop_path}`}
            alt={movie.title}
            layout="fill"
            objectFit="cover"
            className="opacity-60"
          />
        )}
        <div className="relative p-8 z-10 ">
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <div className="text-gray-400">{movie.tagline}</div>
          <div className="mt-4 flex items-center space-x-4">
            <span className="bg-yellow-500 px-2 py-1 rounded font-bold">
              {movie.vote_average.toFixed(1)}
            </span>
            <span className="text-gray-300">{movie.release_date}</span>
            <span className="text-gray-300">
              {movie.runtime} min | {movie.genres.map((g) => g.name).join(", ")}
            </span>
          </div>
        </div>
      </div>

      {/* Movie Overview and Details */}
      <div className="bg-gray-400">
        <div className="container mx-auto py-8 px-4 ">
          <div className="flex flex-col md:flex-row space-x-0 md:space-x-8 space-y-8 md:space-y-0">
            {/* Movie Poster */}
            <div className="flex-shrink-0">
              {movie.poster_path ? (
                <Image
                  src={`${ApiConfig.baseImagesUrl}${movie.poster_path}`}
                  alt={movie.title}
                  width={300}
                  height={450}
                  className="rounded-lg shadow-lg"
                />
              ) : (
                <div className="w-72 h-96 bg-gray-300 flex items-center justify-center">
                  No Image Available
                </div>
              )}
            </div>

            {/* Movie Details */}
            <div>
              <h2 className="text-3xl font-semibold mb-4">Overview</h2>
              <p className="text-lg text-gray-700 mb-6">{movie.overview}</p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Release Date:</h3>
                  <p>{movie.release_date}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Genres:</h3>
                  <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Budget:</h3>
                  <p>${movie.budget.toLocaleString()}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Revenue:</h3>
                  <p>${movie.revenue.toLocaleString()}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Status:</h3>
                  <p>{movie.status}</p>
                </div>
              </div>

              {/* Back to Home Button */}
              <button
                onClick={() => push("/home")}
                className="mt-8 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieDetails;

export async function getStaticProps(context) {
  const { movieId } = context.params;
  const res = await fetch(
    `${ApiConfig.baseUrl}${ApiConfig.movieDetailsUrl}${movieId}${ApiConfig.apiKey}`
  );
  const data = await res.json();

  return {
    props: { movie: data },
  };
}

export function getStaticPaths() {
  return {
    paths: [], // You can pre-generate some movie pages if needed
    fallback: "blocking", // For dynamically fetching movie details
  };
}
