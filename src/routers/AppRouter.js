import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import MainPage from "../pages/MainPage";
import MoviePage from "../pages/MoviePage";
import SearchPage from "../pages/SearchPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <div className="app__body mb-10">
        <Switch>
          <Route exact path="/search" component={SearchPage}></Route>
          <Route path="/movie/:movieId" component={MoviePage}></Route>
          <Route exact path="/" component={MainPage}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
