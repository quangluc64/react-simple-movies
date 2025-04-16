import React from "react";

const MovieCard = () => {
  return (
    <div className="movie-card p-3 bg-slate-800 rounded-2xl text-white">
      <img
        src="https://lumiere-a.akamaihd.net/v1/images/102_gza1510_comp_v002_c5fae827.jpeg?region=0%2C0%2C3840%2C2160"
        alt=""
        className="w-full h-[200px] object-cover rounded-xl mb-5"
      />
      <h3 className="text-lg font-bold mb-3">Spiderman: Homecomming</h3>
      <div className="flex items-center justify-between text-sm opacity-50 mb-5">
        <span>2017</span>
        <span>7.4</span>
      </div>
      <button className="w-full px-6 py-3 bg-primary rounded-lg font-bold text-xl">
        Watch Now
      </button>
    </div>
  );
};

export default MovieCard;
