import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getFavorites, removeFavorite } from "../../store/user/actions";
import FavoritesCard from "../../components/FavoritesPage/FavoritesCard";
import FavoritesPagination from "../../components/FavoritesPage/FavoritesPagination";
import { deleteBeer } from "../../dataAccess/userRepository/helpers";

class FavoritesListContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1
    };
  }

  // TODO: мб debounce попробуешь тут?
  componentDidMount() {
    const { user, favoritesBeers } = this.props;
    const ids = favoritesBeers.map(elem => {
      return elem.id;
    });
    if (Object.entries(user).length !== 0) {
      user.beerList.forEach(elem => {
        if (!ids.includes(elem)) this.props.getFavorites(elem);
      });
    }
  }

  currentPageIncrement = () => {
    this.setState(prev => ({ currentPage: prev.currentPage + 1 }));
  };

  currentPageDecrement = () => {
    this.setState(prev => ({ currentPage: prev.currentPage - 1 }));
  };

  setCurrentPage = page => {
    this.setState({ currentPage: page });
  };

  handleRemove = async id => {
    const { user } = this.props;
    if (Object.entries(user).length !== 0) {
      await deleteBeer({ id, userId: user.id });
      this.props.removeFavorite(id);
    }
  };

  render() {
    const { favoritesBeers } = this.props;
    const { currentPage } = this.state;

    const user = null;

    const index = currentPage === 1 ? 0 : (currentPage - 1) * 5;
    const beers = favoritesBeers.slice(index, index + 5);

    const length = Math.ceil(favoritesBeers.length / 5);
    const pageArray = [];
    for (let i = 0; i < length; i += 1) {
      pageArray.push(i + 1);
    }

    let paginationFinal = [];

    if (pageArray.length > 5) {
      if (currentPage === 1) {
        paginationFinal = pageArray.slice(currentPage - 1, currentPage + 3);
      } else if (currentPage === pageArray.length) {
        paginationFinal = pageArray.slice(currentPage - 3, currentPage + 1);
      } else {
        paginationFinal = pageArray.slice(currentPage - 2, currentPage + 2);
      }
    } else {
      paginationFinal = [...pageArray];
    }
    return (
      <div>
        <FavoritesCard
          beers={beers}
          handleRemove={this.handleRemove}
          favoritesBeers={favoritesBeers}
          currentPageDecrement={this.currentPageDecrement}
        />
        <FavoritesPagination
          userPage={user !== null ? user.id : null}
          pageArray={pageArray}
          currentPage={currentPage}
          paginationFinal={paginationFinal}
          currentPageIncrement={this.currentPageIncrement}
          currentPageDecrement={this.currentPageDecrement}
          setCurrentPage={this.setCurrentPage}
        />
      </div>
    );
  }
}

FavoritesListContainer.propTypes = {
  getFavorites: PropTypes.func.isRequired,
  favoritesBeers: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.objectOf(PropTypes.any),
  removeFavorite: PropTypes.func.isRequired
};

FavoritesListContainer.defaultProps = {
  user: null
};

const mapStateToProps = state => {
  return {
    favoritesBeers: state.user.favoritesBeers,
    user: state.user.user
  };
};

export default connect(mapStateToProps, { getFavorites, removeFavorite })(
  FavoritesListContainer
);
