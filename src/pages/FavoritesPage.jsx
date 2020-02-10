import React from "react";

import FavoritesList from "../containers/FavoritesPage/FavoritesList.container";
import HeaderContainer from "../containers/Header.container";

class FavoritesPage extends React.PureComponent {
  render() {
    return (
      <>
        <HeaderContainer />
        <FavoritesList />
      </>
    );
  }
}

export default FavoritesPage;
