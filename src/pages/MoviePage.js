import React, { useEffect, useState } from "react";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import StarIcon from "@mui/icons-material/Star";
import PeopleIcon from "@mui/icons-material/People";

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
            url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`,
              backgroundPositionX: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></div>

          <div
            className="moviePage__info relative mx-3 md:mx-20 lg:mx-48 p-4 md:p-10 shadow-xl rounded-lg text-white"
            style={{ backgroundColor: "#141414" }}
          >
            <div className="flex justify-between  items-start">
              <h2 className="text-xl font-semibold">{movie.title}</h2>
              <BookmarkBorderIcon></BookmarkBorderIcon>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-300">
              <div className="flex space-x-1 items-center">
                <StarIcon></StarIcon>
                <p>{movie.vote_average}</p>
              </div>
              <div className="flex space-x-1 items-center">
                <p>{movie.release_date.substring(0, 4)}</p>
              </div>
              <div className="flex space-x-1 items-center">
                <PeopleIcon></PeopleIcon>
                <p>{movie.vote_count}</p>
              </div>
            </div>

            <div className="mt-7">
              <h5 className="font-medium">Generos</h5>
              <div className="flex space-x-2 mt-2">
                {movie.genres.map((genre) => (
                  <p className="bg-slate-800 rounded-full text-xs py-2 px-4">
                    {genre.name}
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-7">
              <h5 className="font-medium">Informacion</h5>
              <p className="text-sm text-gray-300">{movie.overview}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoviePage;
