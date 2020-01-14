import React from "react";

import Header from "../components/Header";
import FavoritesList from "../containers/FavoritesList";

class FavoritesPage extends React.PureComponent {
  render() {
    return (
      <>
        <Header />
        <FavoritesList />
      </>
    );
  }
}

export default FavoritesPage;
