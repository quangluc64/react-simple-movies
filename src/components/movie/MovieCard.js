import React from "react";

const MovieCard = ({ item }) => {
  const { title, poster_path, release_date, vote_average } = item;
  return (
    <div className="movie-card flex flex-col p-3 bg-slate-800 rounded-2xl text-white h-full select-none">
      <img
        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
        alt=""
        className="w-full h-[200px] object-cover rounded-xl mb-5"
      />
      <div className="flex flex-col flex-1">
        <h3 className="text-lg font-bold mb-3">{title}</h3>
        <div className="flex items-center justify-between text-sm opacity-50 mb-5">
          <span>{new Date(release_date).getFullYear()}</span>
          <span>{vote_average.toFixed(1)}</span>
        </div>
        <button className="w-full px-6 py-3 bg-primary rounded-lg font-bold text-xl mt-auto">
          Watch Now
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
