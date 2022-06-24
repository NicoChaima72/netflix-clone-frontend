import React from "react";
import ReactCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import "./Carousel.css";
import MovieCard from "./MovieCard";

const Carousel = ({
  movies: {
    genre,
    results: { data },
  },
}) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 7.5,
      slidesToSlide: 7,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 6.5,
      slidesToSlide: 6,
    },
    tablet: {
      breakpoint: { max: 768, min: 640 },
      items: 4.5,
      slidesToSlide: 4,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 3.5,
      slidesToSlide: 3,
    },
  };

  let items = data.results.sort(() => Math.random() - 0.5);

  return (
    <div>
      <h3 className="text-white text-xl md:text-2xl font-semibold mb-2 md:mb-3">
        {genre}
      </h3>
      <div>
        <ReactCarousel
          swipeable={true}
          draggable={true}
          responsive={responsive}
          infinite={true}
          keyBoardControl={true}
          transitionDuration={0}
        >
          {items.map((movie, index) => (
            <MovieCard
              movie={movie}
              onDragStart={(e) => e.preventDefault()}
              key={index}
            ></MovieCard>
          ))}
        </ReactCarousel>
      </div>
    </div>
  );
};

export default Carousel;
