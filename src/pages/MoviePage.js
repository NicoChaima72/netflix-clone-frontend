import React, { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import PeopleIcon from "@mui/icons-material/People";
import HomeIcon from "@mui/icons-material/Home";

import "./MoviePage.css";
import { useParams } from "react-router-dom";
import { getMovieById } from "../services/movieService";
import { Box, CircularProgress } from "@mui/material";

const MoviePage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getMovie(id) {
      const result = await getMovieById(id);
      setMovie(result.results.data);
      setIsLoading(false);
      console.log(result.results.data);
    }

    getMovie(movieId);
  }, [movieId]);

  return (
    <div className="">
      {isLoading ? (
        <div className="">
          <h1 className="text-white p-32"> </h1>
          <Box className="mt-30" sx={{ display: "flex" }}>
            <CircularProgress
              color="success"
              className="mx-auto text-center "
            />
          </Box>
        </div>
      ) : (
        <div>
          <div
            className="moviePage__image"
            id="movie-background"
            style={{
              background: `linear-gradient(
            to bottom,
            rgba(20, 20, 20, 0.9),
            rgba(20, 20, 20, 0.8),
            rgba(20, 20, 20, 0.7),
            rgba(20, 20, 20, 0.7),
            rgba(20, 20, 20, 0.7),
            rgba(20, 20, 20, 0.7),
            rgba(20, 20, 20, 0.7),
            rgba(20, 20, 20, 0.8),
            rgba(20, 20, 20, 0.9),
            rgba(20, 20, 20, 1)
            ),
            url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`,
              backgroundPositionX: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="container mx-auto relative h-full">
              <div className="xl:px-32 text-white absolute top-[40%] pb-20 px-1">
                <h2 className="text-3xl lg:text-5xl font-semibold">
                  {movie.title}
                </h2>
                <div className="flex items-center space-x-6 text-sm text-gray-100">
                  <div className="flex space-x-1 items-center">
                    <StarIcon></StarIcon>
                    <p>{movie.vote_average}</p>
                  </div>
                  <div className="flex space-x-1 items-center">
                    <PeopleIcon></PeopleIcon>
                    <p>{movie.vote_count}</p>
                  </div>
                  <div className="flex space-x-1 items-center">
                    <p className="font-semibold text-lg">
                      {movie.release_date.substring(0, 4)}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-1 mt-2">
                  {movie.genres.map((genre, index) => (
                    <p
                      className="border rounded-full text-xs py-2 px-4"
                      key={index}
                    >
                      {genre.name}
                    </p>
                  ))}
                </div>
                {/* <p className="mt-3">{movie.tagline}</p> */}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={movie.homepage}
                >
                  <button className="flex items-center space-x-2 px-3 py-2 pr-4 bg-white rounded text-black hover:bg-gray-200 mt-8">
                    <HomeIcon></HomeIcon>
                    <p className="text-xs sm:text-sm md:text-base">
                      Visitar pagina oficial
                    </p>
                  </button>
                </a>
                <div className="mt-16 px-2">
                  <h3 className="text-lg font-semibold">Introduccion</h3>
                  <p className="mt-2 text-sm">
                    {movie.overview || "No hay informacion"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoviePage;
