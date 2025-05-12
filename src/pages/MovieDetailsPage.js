import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "config";
import MovieCard from "components/movie/MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
const MovieDetailsPage = () => {
  const { movieId } = useParams(); // lấy id từ URL
  const { data } = useSWR(
    tmdbAPI.getMovieDetails(movieId),
    fetcher
  );
  if (!data) return null; // hoặc return loading...
  const { backdrop_path, poster_path, title, genres } = data;
  return (
    <div className="py-10">
      <div className="w-full h-[600px] relative">
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div
          className="w-full h-full bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url(${tmdbAPI.imageOriginal(backdrop_path)})`,
            backgroundPosition: "center",
          }}
        ></div>
      </div>
      <div className="max-w-[800px] h-[500px] mx-auto -mt-[250px] relative z-1 pb-10">
        <img
          src={tmdbAPI.imageOriginal(poster_path)}
          alt=""
          className="w-full h-full object-cover object-[0_20%] rounded-2xl"
        />
      </div>
      <h1 className="text-center text-3xl font-bold mb-10">{title}</h1>
      <div className="flex justify-center gap-x-10 text-lg font-bold text-[#7D6AFF] mb-10">
        {genres.length > 0 &&
          genres.map((item) => (
            <span
              key={item.id}
              className="px-6 py-2 rounded-3xl border border-[#7D6AFF]"
            >
              {item.name}
            </span>
          ))}
      </div>
      <p className="w-[800px] mx-auto text-center mb-10">
        As Emily struggles to fit in at home and at school, she discovers a
        small red puppy who is destined to become her best friend. When Clifford
        magically undergoes one heck of a growth spurt, becomes a gigantic dog
        and attracts the attention of a genetics company, Emily and her Uncle
        Casey have to fight the forces of greed as they go on the run across New
        York City. Along the way, Clifford affects the lives of everyone around
        him and teaches Emily and her uncle the true meaning of acceptance and
        unconditional love.
      </p>
      {/* <MovieCredit></MovieCredit>
      <MovieVideo></MovieVideo>
      <MovieSimilar></MovieSimilar> */}
      <MovieMeta type="credits"></MovieMeta>
      <MovieMeta type="videos"></MovieMeta>
      <MovieMeta type="similar"></MovieMeta>
    </div>
  );
};

function MovieCredit() {
  const { movieId } = useParams(); // lấy id từ URL
  const { data } = useSWR(
    tmdbAPI.getMovieMeta(movieId, "credits"),
    fetcher
  );
  if (!data) return null; // hoặc return loading...
  const { cast } = data;
  if (!cast || cast.length <= 0) return null;
  return (
    <div className="py-10">
      <h2 className="text-center text-2xl font-bold mb-10">Casts</h2>
      <div className="grid grid-cols-4 gap-10 px-10">
        {cast.length > 0 &&
          cast.slice(0, 4).map((item) => {
            return (
              <div className="w-full h-full" key={item.id}>
                <img
                  src={tmdbAPI.imageOriginal(item.profile_path)}
                  alt=""
                  className="w-full h-[300px] object-cover rounded-lg mb-3"
                />
                <h3 className="text-xl text-center font-medium">{item.name}</h3>
              </div>
            );
          })}
      </div>
    </div>
  );
}
function MovieVideo() {
  const { movieId } = useParams(); // lấy id từ URL
  const { data } = useSWR(
    tmdbAPI.getMovieMeta(movieId, "videos"),
    fetcher
  );
  if (!data) return null; // hoặc return loading...
  const { results } = data;
  if (!results || results.length <= 0) return null;

  return (
    <div className="py-10">
      <div className="flex flex-col gap-10">
        {results.length > 0 &&
          results.slice(0, 5).map((item) => (
            <div key={item.id}>
              <h3 className="text-xl font-medium bg-primary px-4 py-2 mb-4 inline-block rounded-md">
                {item.name}
              </h3>
              <div className="w-full aspect-video">
                <iframe
                  width="720"
                  height="405"
                  src={`https://www.youtube.com/embed/${item.key}`}
                  title={item.name}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="w-full h-full object-fill"
                ></iframe>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
function MovieSimilar() {
  const { movieId } = useParams(); // lấy id từ URL
  const { data } = useSWR(
    tmdbAPI.getMovieMeta(movieId, "similar"),
    fetcher
  );
  if (!data) return null; // hoặc return loading...
  const { results } = data;
  if (!results || results.length <= 0) return null;
  return (
    <div className="py-10">
      <h2 className="text-center text-2xl font-bold mb-5">Similar movies</h2>
      <div className="movie-list px-10">
        <Swiper grabCursor="true" spaceBetween={40} slidesPerView={"auto"}>
          {results.length > 0 &&
            results.map((item) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}
function MovieMeta({type="videos"}){
  const { movieId } = useParams(); // lấy id từ URL
  const { data } = useSWR(
    tmdbAPI.getMovieMeta(movieId, type),
    fetcher
  );
  if (!data) return null; // hoặc return loading...
  if(type==="credits"){
    const { cast } = data;
    if (!cast || cast.length <= 0) return null;
    return (
      <div className="py-10">
        <h2 className="text-center text-2xl font-bold mb-10">Casts</h2>
        <div className="grid grid-cols-4 gap-10 px-10">
          {cast.length > 0 &&
            cast.slice(0, 4).map((item) => {
              return (
                <div className="w-full h-full" key={item.id}>
                  <img
                    src={tmdbAPI.imageOriginal(item.profile_path)}
                    alt=""
                    className="w-full h-[300px] object-cover rounded-lg mb-3"
                  />
                  <h3 className="text-xl text-center font-medium">{item.name}</h3>
                </div>
              );
            })}
        </div>
      </div>
    );
  } else {
    const { results } = data;
    if (!results || results.length <= 0) return null;
    if(type==="videos") {
      return (
        <div className="py-10">
          <div className="flex flex-col gap-10">
            {results.length > 0 &&
              results.slice(0, 5).map((item) => (
                <div key={item.id}>
                  <h3 className="text-xl font-medium bg-primary px-4 py-2 mb-4 inline-block rounded-md">
                    {item.name}
                  </h3>
                  <div className="w-full aspect-video">
                    <iframe
                      width="720"
                      height="405"
                      src={`https://www.youtube.com/embed/${item.key}`}
                      title={item.name}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      className="w-full h-full object-fill"
                    ></iframe>
                  </div>
                </div>
              ))}
          </div>
        </div>
      );
    }
    if(type==="similar"){
      return (
        <div className="py-10">
          <h2 className="text-center text-2xl font-bold mb-5">Similar movies</h2>
          <div className="movie-list px-10">
            <Swiper grabCursor="true" spaceBetween={40} slidesPerView={"auto"}>
              {results.length > 0 &&
                results.map((item) => (
                  <SwiperSlide key={item.id}>
                    <MovieCard item={item}></MovieCard>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      );  
    }
  }
}
export default MovieDetailsPage;
