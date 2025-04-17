import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import MovieCard from "./MovieCard";
import { fetcher } from "../../config";
import useSWR from "swr";
const MovieList = ({type}) => {
  const [movies, setMovies] = useState([]);
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${type}?api_key=685814648889cc009fd6e5dd5ba7986b`,
    fetcher
  );
  useEffect(() => {
    if (data && data.results) {
      setMovies(data.results);
    }
  }, [data]); // chỉ chạy khi `data` thay đổi
  // console.log(movies);
  return (
    <div className="movie-list">
      <Swiper grabCursor="true" spaceBetween={40} slidesPerView={"auto"}>
        {movies.length > 0 && movies.map((item) => (
          <SwiperSlide key={item.id}>
            <MovieCard item = {item}></MovieCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default MovieList;
