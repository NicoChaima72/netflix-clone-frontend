import { Box, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import Header from "../components/Header";
import { getMainQuery } from "../services/movieService";

import "./MainPage.css";

const MainPage = () => {
  const [movies, setMovies] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const discoverMovies = async () => {
    const mainDataMovies = await getMainQuery();
    console.log(mainDataMovies);
    setMovies(mainDataMovies);
    setIsLoading(false);
  };
  useEffect(() => {
    discoverMovies();
  }, []);

  return (
    <>
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
          <Header movies={movies.discover}></Header>
          <div className="main__container relative mx-4 md:mx-12">
            <section className="mb-5">
              <Carousel movies={movies.discover}></Carousel>
              <div className="space-y-10 mt-10">
                {movies.genres.map((moviesByGenre) => (
                  <Carousel
                    movies={moviesByGenre}
                    key={moviesByGenre.genre}
                  ></Carousel>
                ))}
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default MainPage;
