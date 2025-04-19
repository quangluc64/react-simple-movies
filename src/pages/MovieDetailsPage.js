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
  console.log(data);
  return <div>Movie Details Page</div>;
};

export default MovieDetailsPage;
