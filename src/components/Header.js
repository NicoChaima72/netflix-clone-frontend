import React, { useEffect, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import "./Header.css";
import { truncateWithEllipses } from "../utils/utils";
import { Link } from "react-router-dom";

const Header = ({ movies }) => {
  const [movieMain, setMovieMain] = useState(null);

  useEffect(() => {
    let movieMainData = movies.results.data.results;
    movieMainData =
      movieMainData[Math.floor(Math.random() * (movieMainData.length - 0)) + 0];
    setMovieMain(movieMainData);

    console.log(movieMainData);
  }, [movies.results.data.results]);

  return (
    <>
      {movieMain && (
        <header
          className="header relative top-0 z-0 text-white w-full"
          style={{
            background: `linear-gradient(
          to bottom,
          rgba(20, 20, 20, 0.8),
          rgba(20, 20, 20, 0.6),
          rgba(20, 20, 20, 0.4),
          rgba(20, 20, 20, 0.4),
          rgba(20, 20, 20, 0.4),
          rgba(20, 20, 20, 0.4),
          rgba(20, 20, 20, 0.4),
          rgba(20, 20, 20, 0.6),
          rgba(20, 20, 20, 0.8),
          rgba(20, 20, 20, 1)
          ),
          url("https://image.tmdb.org/t/p/original${movieMain.backdrop_path}")`,
            backgroundPositionX: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="header__info container absolute md:pl-12  md:w-1/2 flex flex-col items-center md:block">
            <h2 className="header__title text-2xl sm:text-4xl md:text-5xl lg:text-6xl">
              {movieMain.title}
            </h2>
            <p className="py-2 text-xs sm:text-sm md:text-base lg:text-lg px-4">
              {truncateWithEllipses(movieMain.overview, 265)}
            </p>
            <div className="flex items-center space-x-3 mt-3">
              <Link to={`/movie/${movieMain.id}`}>
                <button className="flex items-center space-x-2 px-3 py-2 pr-4 bg-white rounded text-black hover:bg-gray-200">
                  <PlayArrowIcon></PlayArrowIcon>
                  <p className="text-xs sm:text-sm md:text-base">Reproducir</p>
                </button>
              </Link>
              <Link to={`/movie/${movieMain.id}`}>
                <button className="flex items-center space-x-2 px-3 py-2 pr-4 bg-zinc-600 rounded text-white hover:bg-zinc-700">
                  <InfoOutlinedIcon></InfoOutlinedIcon>
                  <p className="text-xs sm:text-sm md:text-base">
                    Más informacion
                  </p>
                </button>
              </Link>
            </div>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
