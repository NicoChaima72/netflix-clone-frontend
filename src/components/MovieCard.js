import React from "react";
import { Link } from "react-router-dom";

import "./MovieCard.css";

const MovieCard = ({ movie, ...rest }) => {
  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="movieCard">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
          }
          alt=""
          role="presentation"
          className="px-1"
          {...rest}
        />
      </div>
    </Link>
  );
};

export default MovieCard;
