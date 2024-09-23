import { ApiConfig } from "@/api_config";
import MovieCard from "@/components/MovieCard";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";

function Search() {
  const [searchValue, setSearchValue] = useState("");
  const getMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    return data.results;
  };

  const { data, error, isLoading } = useSWR(
    searchValue
      ? `${ApiConfig.baseUrl}${ApiConfig.movieSearchUrl}${ApiConfig.apiKey}&query=${searchValue}`
      : null,
    getMovies
  );

  return (
    <>
      <div className="flex bg-gray-400 flex-row items-center justify-center">
        <input
          className="p-2 m-2 bg-gray-300 rounded w-9/12 border focus:outline-none focus:ring focus:border-blue-300"
          type="text"
          placeholder="search for what you want"
          value={searchValue}
          onChange={(eve) => setSearchValue(eve.target.value)}
        />
      </div>

      {isLoading && <div>Loading...</div>}
      {error && <div>Something went wrong: {error.message}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6  pb-12 p-6 bg-gray-400">
        {data &&
          data.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </>
  );
}

export default Search;
