import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import routes from "./mainRoutes";
import LandingPage from "../pages/LandingPage";
import FavoritesPage from "../pages/FavoritesPage";
import BeerDetailsPage from "../pages/BeerDetailsPage";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import VerifyPage from "../pages/VerifyPage";
import UserDetailsPage from "../pages/UserDetailsPage";
import ChangePasswordPage from "../pages/ChangePasswordPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import BrewListPage from "../pages/BrewListPage";
import AddBrewPage from "../pages/AddBrewPage";
import SingleBrew from "../pages/SingleBrew";

const Routes = () => {
  return (
    <Switch>
      <Route exact path={routes.search}>
        <LandingPage />
      </Route>
      <Route exact path={routes.favorites}>
        <FavoritesPage />
      </Route>
      <Route path={routes.favPagination}>
        <FavoritesPage />
      </Route>
      <Route path={routes.beer}>
        <BeerDetailsPage />
      </Route>
      <Route path={routes.signIn}>
        <SignInPage />
      </Route>
      <Route path={routes.signUp}>
        <SignUpPage />
      </Route>
      <Route path={routes.verify}>
        <VerifyPage />
      </Route>
      <Route exact path={routes.user}>
        <UserDetailsPage />
      </Route>
      <Route path={routes.changePassword}>
        <ChangePasswordPage />
      </Route>
      <Route path={routes.forgotPassword}>
        <ForgotPasswordPage />
      </Route>
      <Route exact path={routes.brews}>
        <BrewListPage />
      </Route>
      <Route path={routes.addBrew}>
        <AddBrewPage />
      </Route>
      <Route exact path={routes.singleBrew}>
        <SingleBrew />
      </Route>
      <Route path="*">
        <Redirect to={routes.root} />
      </Route>
    </Switch>
  );
};

export default Routes;
