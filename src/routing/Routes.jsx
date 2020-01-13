import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import routes from "./mainRoutes";
import LandingPage from "../pages/LandingPage";
import FavoritesPage from "../pages/FavoritesPage";
import BeerDetailsPage from "../pages/BeerDetailsPage";

const Routes = () => {
  return (
    <Switch>
      <Route exact path={routes.search}>
        <LandingPage />
      </Route>
      <Route exact path={routes.favorites}>
        <FavoritesPage />
      </Route>
      <Route path={routes.beer}>
        <BeerDetailsPage />
      </Route>
      <Route path="*">
        <Redirect to={routes.root} />
      </Route>
    </Switch>
  );
};

export default Routes;
