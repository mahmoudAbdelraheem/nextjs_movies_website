import PopularMovieCard from "@/components/popularMovieCard";
import { useEffect, useState } from "react";

function Home() {
  const [movies, setMovies] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newMovie, setNewMovie] = useState({
    adult: false,
    backdrop_path: "",
    genre_ids: [],
    original_language: "en",
    original_title: "",
    title: "",
    overview: "",
    popularity: "",
    vote_average: "",
    poster_path: "",
    release_date: "",
    video: false,
    vote_count: "",
  });

  const getMovies = async () => {
    const res = await fetch("/api/popular");
    const data = await res.json();
    console.log(data.results);
    setMovies(data.results);
  };

  useEffect(() => {
    getMovies();
  }, []);

  const removeMovie = async (movieId) => {
    const res = await fetch(`/api/popular/${movieId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setMovies(data.results);
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleInputChange = (e) => {
    setNewMovie({ ...newMovie, [e.target.name]: e.target.value });
  };

  const addMovie = async (e) => {
    e.preventDefault();
    if (newMovie.id) {
      updateMovie();
      console.log("update");
    } else {
      addNewMovie();
      console.log("add");
    }
  };
  const addNewMovie = async () => {
    const res = await fetch("/api/popular", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMovie),
    });
    const data = await res.json();
    setNewMovie({
      adult: false,
      backdrop_path: "",
      genre_ids: [],
      original_language: "en",
      original_title: "",
      title: "",
      overview: "",
      popularity: "",
      vote_average: "",
      poster_path: "",
      release_date: "",
      video: false,
      vote_count: "",
    });
    setMovies(data.results);
    togglePopup();
  };

  const updateMovie = async () => {
    const res = await fetch(`/api/popular`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMovie),
    });
    const data = await res.json();
    console.log(data.results);
    setMovies(data.results);
    setNewMovie({
      adult: false,
      backdrop_path: "",
      genre_ids: [],
      original_language: "en",
      original_title: "",
      title: "",
      overview: "",
      popularity: "",
      vote_average: "",
      poster_path: "",
      release_date: "",
      video: false,
      vote_count: "",
    });
    togglePopup();
  };

  const openPopup = (movieData) => {
    setNewMovie({ ...movieData });
    togglePopup();
  };

  return (
    <div className="p-6 bg-gray-200 min-h-screen">
      <button
        onClick={togglePopup}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out mb-6"
      >
        Add New Movie
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12">
        {movies &&
          movies.map((movie) => (
            <PopularMovieCard
              key={movie.id}
              movie={movie}
              deleteMovie={() => removeMovie(movie.id)}
              updateMovie={() => openPopup(movie)}
            />
          ))}
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Add New Movie</h2>

            <form onSubmit={addMovie} className="space-y-4">
              <div>
                <label className="block text-gray-700">Movie Title</label>
                <input
                  type="text"
                  name="title"
                  value={newMovie.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter movie title"
                  required
                />
              </div>
              <input
                type="number"
                name="vote_average"
                value={newMovie.vote_average}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter movie vote average"
                required
              />

              <div>
                <label className="block text-gray-700">Movie Overview</label>
                <textarea
                  name="overview"
                  value={newMovie.overview}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter movie overview"
                  required
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={togglePopup}
                  className="mr-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  {newMovie.id ? "Update Movie" : "Add Movie"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;

// export async function getStaticProps() {
//   // var res = await fetch(
//   //   ApiConfig.baseUrl + ApiConfig.popularMoviesUrl + ApiConfig.apiKey
//   // );
//   var res = await fetch("/api/popular");
//   var data = await res.json();
//   return {
//     props: { movies: data.results },
//   };
// }
