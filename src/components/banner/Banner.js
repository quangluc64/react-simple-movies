import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "config";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import { useNavigate } from "react-router-dom";
import Button from "components/button/Button";

const Banner = () => {
  const [movies, setMovies] = useState([]);
  const { data } = useSWR(
    tmdbAPI.getMovieList("upcoming"),
    fetcher
  );
  useEffect(() => {
    if (data && data.results) {
      setMovies(data.results);
    }
  }, [data]); // chỉ chạy khi `data` thay đổi

  // Tương đương <=> const movies = data?.results || [];

  // console.log("Movies ~ banner: ", movies);
  return (
    <section className="banner h-[500px] page-container mb-20">
      <Swiper grabCursor="true" spaceBetween={40} slidesPerView={"auto"}>
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <BannerItem item={item}></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};
function BannerItem({ item }) {
  const navigate = useNavigate();
  const { title, poster_path, id } = item;
  return (
    <div className="w-full h-full rounded-xl bg-white relative">
      <div className="overlay absolute inset-0 rounded-xl bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)]"></div>
      <img
        src={tmdbAPI.imageOriginal(poster_path)}
        alt=""
        className="w-full h-full rounded-xl object-cover object-[0_30%]"
      />
      <div className="absolute left-5 bottom-5 text-white">
        <h2 className="text-3xl font-bold mb-5">{title}</h2>
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
        <Button
          onClick={() => {
            navigate(`/movies/${id}`);
          }}
        >Watch Now</Button>
      </div>
    </div>
  );
}

export default Banner;
