import { ApiConfig } from "@/api_config";
import Image from "next/image";
import { useRouter } from "next/router";

function MovieCard({ movie }) {
  const {push} = useRouter();
  return (
    <div className="  flex flex-col bg-gray-800 rounded-3xl justify-center mb-12 mt-12 text-white">
      <div className="bg-red shadow-lg  rounded-3xl p-8 flex space-x-8">
        <div className="h-48 overflow-visible w-1/2">
          {movie.poster_path ? (
            <Image
            onClick={()=> push(`/details/${movie.id}`)}
              alt={movie.title}
              className="rounded-3xl shadow-lg cursor-pointer hover:rotate-3 hover:scale-105 duration-300"
              src={`${ApiConfig.baseImagesUrl}${movie.poster_path}`}
              width={200}
              height={300}
            />
          ) : (
            <div className= "bg-gray-400 flex justify-center items-center w-full  h-full rounded-3xl shadow-lg cursor-pointer hover:rotate-3 hover:scale-105 duration-300">
              <span className="text-xl font-bold">No Image Available</span>
            </div>
          )}
        </div>
        <div className="flex flex-col w-1/2 space-y-4">
          <div className="flex flex-col justify-between items-start">
            <h2 className="text-2xl font-bold">{movie.title}</h2>
            <div className="bg-yellow-400 font-bold rounded-xl p-2 mt-4 text-black ">
              {movie.vote_average.toFixed(1)} ⭐
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Movie</div>
            <div className="text-lg text-gray-800">{movie.release_date}</div>
          </div>
          <p className="text-gray-400 max-h-40 truncate overflow-y-hidden">
            {movie.overview}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
