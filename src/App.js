import { Fragment } from "react";
import MovieList from "./components/movie/MovieList";
export default function App() {
  return (
    <Fragment>
      <header className="header flex items-center justify-center gap-x-5 text-white font-medium py-10 mb-5">
        <span className="text-primary">Home</span>
        <span>Movies</span>
      </header>
      {/*  ==== Banner ==== */}
      <section className="banner h-[500px] page-container mb-20">
        <div className="w-full h-full rounded-xl bg-white relative">
          <div className="overlay absolute inset-0 rounded-xl bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)]"></div>
          <img
            src="https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/BF0D/production/_106090984_2e39b218-c369-452e-b5be-d2476f9d8728.jpg"
            alt=""
            className="w-full h-full rounded-xl object-cover"
          />
          <div className="absolute left-5 bottom-5 text-white">
            <h2 className="text-3xl font-bold mb-5">Avengers: Endgame</h2>
            <div className="flex items-center gap-x-3 mb-8">
              <span className="px-4 py-2 border border-white rounded-md">
                Action
              </span>
              <span className="px-4 py-2 border border-white rounded-md">
                Adventure
              </span>
              <span className="px-4 py-2 border border-white rounded-md">
                Drama
              </span>
            </div>
            <button className="px-6 py-3 bg-primary rounded-lg font-medium">
              Watch Now
            </button>
          </div>
        </div>
      </section>
      {/*  ==== Now Playing ==== */}
      <section className="movies-layout page-container mb-20">
        <h2 className="text-white text-2xl font-bold mb-10">Now Playing</h2>
        <MovieList></MovieList>
      
      </section>
      {/*  ==== Top Rated ==== */}
      <section className="movies-layout page-container mb-20">
        <h2 className="text-white text-2xl font-bold mb-10">Top Rated</h2>
        <div className="movie-list grid grid-cols-3 gap-10">
          <div className="movie-card p-3 bg-slate-800 rounded-2xl text-white">
            <img
              src="https://lumiere-a.akamaihd.net/v1/images/102_gza1510_comp_v002_c5fae827.jpeg?region=0%2C0%2C3840%2C2160"
              alt=""
              className="w-full h-[250px] object-cover rounded-xl mb-5"
            />
            <h3 className="text-xl font-bold mb-3">Spiderman: Homecomming</h3>
            <div className="flex items-center justify-between text-sm opacity-50 mb-5">
              <span>2017</span>
              <span>7.4</span>
            </div>
            <button className="w-full px-6 py-3 bg-primary rounded-lg font-bold text-xl">
              Watch Now
            </button>
          </div>
        </div>
      </section>
      {/*  ==== Trending ==== */}
      <section className="movies-layout page-container mb-20">
        <h2 className="text-white text-2xl font-bold mb-10">Trending</h2>
        <div className="movie-list grid grid-cols-3 gap-10">
          <div className="movie-card p-3 bg-slate-800 rounded-2xl text-white">
            <img
              src="https://lumiere-a.akamaihd.net/v1/images/102_gza1510_comp_v002_c5fae827.jpeg?region=0%2C0%2C3840%2C2160"
              alt=""
              className="w-full h-[250px] object-cover rounded-xl mb-5"
            />
            <h3 className="text-xl font-bold mb-3">Spiderman: Homecomming</h3>
            <div className="flex items-center justify-between text-sm opacity-50 mb-5">
              <span>2017</span>
              <span>7.4</span>
            </div>
            <button className="w-full px-6 py-3 bg-primary rounded-lg font-bold text-xl">
              Watch Now
            </button>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
