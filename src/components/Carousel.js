import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

import "./Carousel.css";
import MovieCard from "./MovieCard";

const Carousel = ({
  movies: {
    genre,
    results: { data },
  },
}) => {
  const responsive = {
    0: { items: 3.5 },
    568: { items: 5.5 },
    1024: { items: 8.5 },
  };

  let items = data.results
    .sort(() => Math.random() - 0.5)
    .map((movie) => (
      <MovieCard
        movie={movie}
        onDragStart={(e) => e.preventDefault()}
      ></MovieCard>
    ));

  items = [...items, <div></div>, <div></div>];

  return (
    <div>
      <h3 className="text-white text-xl md:text-2xl font-semibold mb-2 md:mb-3">
        {genre}
      </h3>
      <div>
        <AliceCarousel
          className=""
          mouseTracking
          responsive={responsive}
          items={items}
        />
      </div>
    </div>
  );
};

export default Carousel;
