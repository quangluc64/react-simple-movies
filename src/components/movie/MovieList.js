import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import MovieCard from "./MovieCard";
import { fetcher, tmdbAPI } from "config";
import useSWR from "swr";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
const MovieList = ({type}) => {
  const { data } = useSWR(
    tmdbAPI.getMovieList(type),
    fetcher
  );
  const movies = data?.results || [];
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
MovieList.propTypes = {
  type: PropTypes.string.isRequired,
};
function FallbackComponent(){
  return (
    <p className="bg-red-50 text-red-400">
      Something went wrong with this component
    </p>
  )
}
export default withErrorBoundary(MovieList,{
  FallbackComponent
}
);
