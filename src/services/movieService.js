const token = process.env.REACT_APP_API_KEY_TMDB;
const baseURL = "https://api.themoviedb.org/3";

export const getMainQuery = () => {
  // sin usar async await
  return Promise.all([getDiscoverMovies(), getGenres()]).then((results) => {
    let [discoverMovies, genres] = results;
    // const genresId = genres.genres.slice(0, 5).map((genre) => genre.id);
    genres = genres.genres.slice(0, 8);
    const genresFunctions = genres.map(({ id, name }) =>
      getMoviesByGenre(id, name)
    );

    return Promise.all(genresFunctions).then((res) => {
      return { discover: discoverMovies, genres: res };
    });
  });
};

export const getDiscoverMovies = () => {
  const url = `${baseURL}/discover/movie?api_key=${token}&language=es&sort_by=popularity.desc&include_adult=true&include_video=false&page=1&region=CL`;

  return fetch(url)
    .then((data) => data.json())
    .then((data) => ({
      ok: true,
      genre: "Populares en Netflix",
      results: { data },
    }))
    .catch((error) => {
      console.log({ error });
      return { ok: false };
    });
};

export const getMoviesByGenre = (genreId, genreTitle = null) => {
  const url = `${baseURL}/discover/movie?api_key=${token}&language=es&sort_by=popularity.desc&include_adult=true&include_video=false&page=1&region=CL&with_genres=${genreId}`;

  return fetch(url)
    .then((data) => data.json())
    .then((data) => {
      if (genreTitle) return { ok: true, genre: genreTitle, results: { data } };

      return { ok: true, results: { data } };
    })
    .catch((error) => {
      console.log({ error });
      return { ok: false };
    });
};

export const getGenres = () => {
  const url = `${baseURL}/genre/movie/list?api_key=${token}&language=es`;

  return fetch(url)
    .then((data) => data.json())
    .catch((error) => {
      console.log({ error });
      return { ok: false };
    });
};

export const getMoviesByName = (query) => {
  const url = `${baseURL}/search/movie?api_key=${token}&language=es&page=1&include_adult=true&query=${query}`;

  return fetch(url)
    .then((data) => data.json())
    .then((data) => ({ ok: true, results: { data } }))
    .catch((error) => {
      console.log({ error });
      return { ok: false };
    });
};

export const getMovieById = (id) => {
  const url = `${baseURL}/movie/${id}?api_key=${token}&language=es`;

  return fetch(url)
    .then((data) => data.json())
    .then((data) => ({ ok: true, results: { data } }))
    .catch((error) => {
      console.log({ error });
      return { ok: false };
    });
};
