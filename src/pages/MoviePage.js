import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { api_key, fetcher } from "../config";
import MovieCard from "../components/movie/MovieCard";
import useDebounce from "../hooks/useDebounce";
const MoviePage = () => {
  const [filter, setFilter] = useState("");
  const [url, setUrl] = useState(
    `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}`
  );
  const handleFilterChange = (e) => setFilter(e.target.value);
  const filerDebounce = useDebounce(filter, 500);
  useEffect(() => {
    if (filerDebounce)
      setUrl(
        `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${filerDebounce}`
      );
    else
      setUrl(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}`);
  }, [filerDebounce]);
  const { data } = useSWR(url, fetcher);
  const loading = !data;
  const movies = data?.results || [];
  return (
    <div className="py-5 page-container">
      <div className="flex mb-10">
        <div className="flex-1">
          <input
            type="text"
            className="w-full p-4 bg-slate-800 text-white rounded-bl-xl rounded-tl-xl outline-none"
            placeholder="Type here to search ...."
            onChange={handleFilterChange}
          />
        </div>
        <button className="bg-primary p-3 rounded-tr-xl rounded-br-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#fff"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </div>
      {/* === Loading === */}
      {loading && (
        <div className="w-10 h-10 rounded-full border-4 border-primary mx-auto border-t-transparent animate-spin"></div>
      )}
      {!loading && (
        <div className="grid grid-cols-4 gap-10">
          {movies.length > 0 &&
            movies.map((item) => <MovieCard key={item.id} item={item} />)}
        </div>
      )}
      <div className="flex items-center justify-center gap-x-5 mt-5">
        <span className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
            />
          </svg>
        </span>
        <span className="inline-block leading-none px-4 py-2 bg-white text-slate-900 rounded-md cursor-pointer">1</span>
        <span className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default MoviePage;
