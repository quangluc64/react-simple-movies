import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "components/button/Button";
import { tmdbAPI } from "config";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import LoadingSkeleton from "components/loading/LoadingSkeleton";
const MovieCard = ({ item }) => {
  const navigate = useNavigate();
  const { title, poster_path, release_date, vote_average, id } = item;
  return (
    <div className="movie-card flex flex-col p-3 bg-slate-800 rounded-2xl text-white h-full select-none">
      <img
        src={tmdbAPI.image500(poster_path)}
        alt=""
        className="w-full h-[200px] object-cover rounded-xl mb-5"
      />
      <div className="flex flex-col flex-1">
        <h3 className="text-lg font-bold mb-3">{title}</h3>
        <div className="flex items-center justify-between text-sm opacity-50 mb-5">
          <span>{new Date(release_date).getFullYear()}</span>
          <span>{vote_average.toFixed(1)}</span>
        </div>
        <Button
          onClick={() => {
            navigate(`/movies/${id}`);
          }}
          bgColor="secondary"
        >
          Watch Now
        </Button>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    poster_path: PropTypes.string,
    release_date: PropTypes.string,
    vote_average: PropTypes.number,
    id: PropTypes.string,
  }),
};
function FallbackComponent() {
  return (
    <p className="bg-red-50 text-red-400">
      Something went wrong with this component
    </p>
  );
}
export default withErrorBoundary(MovieCard, {
  FallbackComponent,
});
export const MovieCardSkeleton = () => {
  return (
    <div className="movie-card flex flex-col p-3 bg-slate-800 rounded-2xl text-white h-full select-none">
      <LoadingSkeleton width="100%" height="200px" radius="8px" className="mb-5"></LoadingSkeleton>
      <div className="flex flex-col flex-1">
        <LoadingSkeleton width="100px" height="30px" radius="4px"className="mb-3"></LoadingSkeleton>
        <div className="flex items-center justify-between text-sm opacity-50 mb-5">
          <span><LoadingSkeleton width="50px" height="15px"></LoadingSkeleton></span>
          <span><LoadingSkeleton width="25px" height="15px"></LoadingSkeleton></span>
        </div>
        <LoadingSkeleton width="100%" height="50px" radius="8px"></LoadingSkeleton>
      </div>
    </div>
  );
};
