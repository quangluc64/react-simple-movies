import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { api_key, fetcher } from "../config";

const MovieDetailsPage = () => {
  const { movieId } = useParams(); // lấy id từ URL
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}`,
    fetcher
  );
  if (!data) return null; // hoặc return loading...
  console.log(data);

  const { backdrop_path, poster_path, title, genres } = data;
  return (
    <div className="py-10">
      <div className="w-full h-[600px] relative">
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div
          className="w-full h-full bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
            backgroundPosition: "center",
          }}
        ></div>
      </div>
      <div className="max-w-[800px] h-[500px] mx-auto -mt-[250px] relative z-1 pb-10">
        <img
          src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
          alt=""
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
      <h1 className="text-center text-3xl font-bold mb-10">
        {title}
      </h1>
      <div className="flex justify-center gap-x-10 text-lg font-bold text-[#7D6AFF] mb-10">
        {genres.length > 0 &&
          genres.map((item) => (
            <span
              key={item.id}
              className="px-6 py-2 rounded-3xl border border-[#7D6AFF]"
            >
              {item.name}
            </span>
          ))}
      </div>
      <p className="w-[800px] mx-auto text-center">
        As Emily struggles to fit in at home and at school, she discovers a
        small red puppy who is destined to become her best friend. When Clifford
        magically undergoes one heck of a growth spurt, becomes a gigantic dog
        and attracts the attention of a genetics company, Emily and her Uncle
        Casey have to fight the forces of greed as they go on the run across New
        York City. Along the way, Clifford affects the lives of everyone around
        him and teaches Emily and her uncle the true meaning of acceptance and
        unconditional love.
      </p>
    </div>
  );
};

export default MovieDetailsPage;
