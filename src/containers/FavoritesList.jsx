import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { removeFavorite, getFavorites } from "../store/favorite/actions";
import FavoritesCard from "../components/FavoritesCard";
import FavoritesPagination from "../components/FavoritesPagination";

class FavoritesList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1
    };
  }

  componentDidMount() {
    const { favorites, favoritesBeers } = this.props;
    const ids = favoritesBeers.map(elem => {
      return elem.id;
    });
    favorites.forEach(elem => {
      // eslint-disable-next-line react/destructuring-assignment
      if (!ids.includes(elem)) this.props.getFavorites(elem);
    });
  }

  // DEBOUNCE LODASH

  currentPageIncrement = () => {
    this.setState(prev => ({ currentPage: prev.currentPage + 1 }));
  };

  currentPageDecrement = () => {
    const { currentPage } = this.state;
    this.setState({ currentPage: currentPage - 1 });
  };

  setCurrentPage = page => {
    this.setState({ currentPage: page });
  };

  render() {
    const { favoritesBeers } = this.props;
    const { currentPage } = this.state;
    return (
      <div>
        <FavoritesCard
          favoritesBeers={favoritesBeers}
          currentPage={currentPage}
        />
        <FavoritesPagination
          currentPage={currentPage}
          favoritesBeers={favoritesBeers}
          currentPageIncrement={this.currentPageIncrement}
          currentPageDecrement={this.currentPageDecrement}
          setCurrentPage={this.setCurrentPage}
        />
      </div>
    );
  }
}

FavoritesList.propTypes = {
  favorites: PropTypes.arrayOf(PropTypes.number).isRequired,
  getFavorites: PropTypes.func.isRequired,
  favoritesBeers: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = state => {
  return {
    favorites: state.favorites.favorites,
    favoritesBeers: state.favorites.favoritesBeers
  };
};

export default connect(mapStateToProps, { removeFavorite, getFavorites })(
  FavoritesList
);
