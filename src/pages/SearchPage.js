import React, { useEffect, useState } from "react";
import InputSearch from "../components/InputSearch";
import { useForm } from "../hooks/useForm";
import { useQuery } from "../hooks/useQuery";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import "./SearchPage.css";
import MovieCard from "../components/MovieCard";
import { getMoviesByName } from "../services/movieService";

const SearchPage = () => {
  const [isLoadingMovies, setIsLoadingMovies] = useState(true);
  const [moviesSearch, setMoviesSearch] = useState([]);

  const [formValues, handleInputChange] = useForm({
    search: useQuery().get("q") || "",
  });
  const { search } = formValues;

  useEffect(() => {
    let isSuscribed = true;
    async function getMovies() {
      if (search.length > 2) {
        setIsLoadingMovies(true);
        const results = await getMoviesByName(search);
        if (isSuscribed) {
          setMoviesSearch(results.results.data.results);
          setIsLoadingMovies(false);
        }
      } else {
        setMoviesSearch([]);
        setIsLoadingMovies(false);
      }
    }

    console.log({ search, isSuscribed });
    getMovies();

    return () => (isSuscribed = false);
  }, [search]);

  return (
    <div className="container mx-auto mt-4">
      <h2 className="text-white text-2xl mb-2">Buscar pelicula</h2>
      <InputSearch
        search={search}
        handleInputChange={handleInputChange}
      ></InputSearch>
      {isLoadingMovies ? (
        <Box className="mt-10" sx={{ display: "flex" }}>
          <CircularProgress color="success" className="mx-auto text-center " />
        </Box>
      ) : moviesSearch.length === 0 && search.length > 3 ? (
        <p className="text-white text-center mt-10">No hay resultados</p>
      ) : (
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mt-10">
          {moviesSearch.map((movie) => (
            <MovieCard key={movie.id} movie={movie}></MovieCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
