import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "config";
import MovieCard, { MovieCardSkeleton } from "components/movie/MovieCard";
import useDebounce from "hooks/useDebounce";
// import ReactPaginate from "react-paginate";
import { v4 } from "uuid";
import Button from "components/button/Button";
import useSWRInfinite from "swr/infinite";
const itemsPerPage = 20;
const MoviePage = () => {
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const [nextPage, setNextPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [url, setUrl] = useState(tmdbAPI.getMovieList("popular", nextPage));
  const handleFilterChange = (e) => setFilter(e.target.value);
  const filerDebounce = useDebounce(filter, 500);
  useEffect(() => {
    if (filerDebounce) setUrl(tmdbAPI.getMovieSearch(filerDebounce, nextPage));
    else setUrl(tmdbAPI.getMovieList("popular", nextPage));
  }, [filerDebounce, nextPage]);

  const { data, error, size, setSize } = useSWRInfinite(
    (index) => url.replace("page=1", `page=${index + 1}`),
    fetcher
  );
  const movies = data ? data.reduce((a, b) => a.concat(b.results), []) : [];
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.results.length < itemsPerPage);
  const loading = !data;
  useEffect(() => {
    if (!data || !data.total_pages) return;
    setPageCount(Math.ceil(data.total_pages / itemsPerPage));
    // Đúng là data.total_results: Load không nổi
  }, [data, itemOffset]);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.total_pages;
    setItemOffset(newOffset);
    setNextPage(event.selected + 1);
  };
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
      {/* {loading && (
        <div className="w-10 h-10 rounded-full border-4 border-primary mx-auto border-t-transparent animate-spin"></div>
      )} */}
      {loading && (
        <div className="grid grid-cols-4 gap-10">
          {new Array(itemsPerPage).fill(0).map(() => (
            <MovieCardSkeleton key={v4()}></MovieCardSkeleton>
          ))}
        </div>
      )}
      {!loading && (
        <div className="grid grid-cols-4 gap-10">
          {movies.length > 0 &&
            movies.map((item) => <MovieCard key={item.id} item={item} />)}
        </div>
      )}

      {/* Load more */}
      <div className="mt-10 text-center">
        <Button
          onClick={() => isReachingEnd ? {} : setSize(size + 1)}
          disabled={isReachingEnd}
          className={`${isReachingEnd ? "bg-slate-300" : ""}`}
        >
          Load more
        </Button>
      </div>

      {/* <div className="mt-10">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
        />
      </div> */}

      <div className="flex items-center justify-center gap-x-5 mt-5 hidden">
        <span
          className="cursor-pointer"
          onClick={() => setNextPage(nextPage - 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
            />
          </svg>
        </span>
        {new Array(pageCount).fill(0).map((item, index) => (
          <span
            key={index}
            className="inline-block leading-none px-4 py-2 bg-white text-slate-900 rounded-md cursor-pointer"
            onClick={() => setNextPage(index + 1)}
          >
            {index + 1}
          </span>
        ))}
        <span
          className="cursor-pointer"
          onClick={() => setNextPage(nextPage + 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
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
