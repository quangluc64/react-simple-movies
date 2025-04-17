import { Fragment } from "react";
import MovieList from "./components/movie/MovieList";
import Banner from "./components/banner/Banner";
export default function App() {
  return (
    <Fragment>
      <header className="header flex items-center justify-center gap-x-5 text-white font-medium py-10 mb-5">
        <span className="text-primary">Home</span>
        <span>Movies</span>
      </header>
      {/*  ==== Banner ==== */}
      <Banner></Banner>
      {/*  ==== Now Playing ==== */}
      <section className="movies-layout page-container mb-20">
        <h2 className="text-white text-2xl font-bold mb-10">Now Playing</h2>
        <MovieList type="now_playing"></MovieList>
      </section>
      {/*  ==== Top Rated ==== */}
      <section className="movies-layout page-container mb-20">
        <h2 className="text-white text-2xl font-bold mb-10">Top Rated</h2>
        <MovieList type="top_rated"></MovieList>
      </section>
      {/*  ==== Trending ==== */}
      <section className="movies-layout page-container mb-20">
        <h2 className="text-white text-2xl font-bold mb-10">Trending</h2>
        <MovieList type="popular"></MovieList>
      </section>
    </Fragment>
  );
}
