import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import UserInfo from "../../components/UserDetailsPage/UserInfo";
import { getUser } from "../../store/user/actions";
import Loader from "../../components/Loader";
import { getFavorites } from "../../store/favorite/actions";
import UserBeerList from "../../components/UserDetailsPage/UserBeerList";
import ErrorBoundary from "../../components/ErrorBoundary";
import { deleteBeer } from "../../dataAccess/userRepository/helpers";
import FavoritesPagination from "../../components/FavoritesPage/FavoritesPagination";

class UserPageContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1
    };
  }

  componentDidMount() {
    const { id } = this.props;
    const getUserBeerList = async () => {
      await this.props.getUser(id);
      const { user, favoritesBeers } = this.props;
      const ids = favoritesBeers.map(elem => {
        return elem.id;
      });
      if (Object.entries(user).length !== 0) {
        user.beerList.forEach(elem => {
          if (!ids.includes(elem)) this.props.getFavorites(elem);
        });
      }
    };
    getUserBeerList();
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
      await this.props.getUser(user.id);
    }
  };

  render() {
    const { currentPage } = this.state;
    const { user, error, favoritesBeers } = this.props;
    const index = currentPage === 1 ? 0 : (currentPage - 1) * 6;
    const beers = favoritesBeers.slice(index, index + 6);

    const length = Math.ceil(favoritesBeers.length / 5);
    const pageArray = [];
    for (let i = 0; i < length; i += 1) {
      pageArray.push(i + 1);
    }

    let paginationFinal = [];

    if (pageArray.length > 6) {
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
    if (Object.entries(user).length === 0 && error === null) {
      return <Loader />;
    }
    return (
      <>
        {error !== null ? (
          <ErrorBoundary error={error} />
        ) : (
          <>
            <UserInfo user={user} />
            <UserBeerList
              beers={beers}
              handleRemove={this.handleRemove}
              favoritesBeers={favoritesBeers}
              currentPageDecrement={this.currentPageDecrement}
            />
            <FavoritesPagination
              userId={user !== null ? user.id : null}
              pageArray={pageArray}
              currentPage={currentPage}
              paginationFinal={paginationFinal}
              currentPageIncrement={this.currentPageIncrement}
              currentPageDecrement={this.currentPageDecrement}
              setCurrentPage={this.setCurrentPage}
            />
          </>
        )}
      </>
    );
  }
}

UserPageContainer.propTypes = {
  id: PropTypes.string.isRequired,
  getUser: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  error: PropTypes.string,
  favoritesBeers: PropTypes.arrayOf(PropTypes.object).isRequired,
  getFavorites: PropTypes.func.isRequired
};

UserPageContainer.defaultProps = {
  error: null
};

const mapStateToProps = state => {
  return {
    user: state.user.user,
    error: state.user.error,
    favoritesBeers: state.favorites.favoritesBeers
  };
};

export default connect(mapStateToProps, { getUser, getFavorites })(
  UserPageContainer
);
