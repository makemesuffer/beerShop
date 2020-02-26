import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import UserInfo from "../../components/UserDetailsPage/UserInfo";
import {
  getUser,
  getForeignUser,
  getFavorites,
  removeFavorite
} from "../../store/user/actions";
import Loader from "../../components/Loader";
import UserBeerList from "../../components/UserDetailsPage/UserBeerList";
import ErrorBoundary from "../../components/ErrorBoundary";
import {
  deleteBeer,
  uploadImage,
  deleteImage
} from "../../dataAccess/userRepository/helpers";
import FavoritesPagination from "../../components/FavoritesPage/FavoritesPagination";

class UserPageContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1
    };
  }

  componentDidMount() {
    const { id, user } = this.props;
    const getUserBeerList = async () => {
      if (user.id !== id || Object.entries(user).length === 0) {
        await this.props.getForeignUser(id);
        const { foreignUser } = this.props;
        if (Object.entries(foreignUser).length !== 0) {
          foreignUser.beerList.forEach(elem => {
            this.props.getFavorites(elem);
          });
        }
      } else {
        await this.props.getUser(id);
        if (Object.entries(user).length !== 0) {
          user.beerList.forEach(elem => {
            this.props.getFavorites(elem);
          });
        }
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
      this.props.removeFavorite(id);
    }
  };

  handleUpload = async e => {
    e.preventDefault();
    const { user } = this.props;
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = async () => {
      const payload = { id: user.id, img: reader.result };
      const result = await uploadImage(payload);
      if (result.data.success === true) {
        await this.props.getUser(user.id);
        user.beerList.forEach(elem => {
          this.props.getFavorites(elem);
        });
      }
    };

    reader.readAsDataURL(file);
  };

  handleDelete = async e => {
    e.preventDefault();
    const { user } = this.props;
    const payload = { id: user.id, img: user.profilePicture };
    const result = await deleteImage(payload);
    if (result.data.success === true) {
      await this.props.getUser(user.id);
      user.beerList.forEach(elem => {
        this.props.getFavorites(elem);
      });
    }
  };

  render() {
    const { currentPage } = this.state;
    const {
      user,
      error,
      favoritesBeers,
      foreignUser,
      allowed,
      id
    } = this.props;

    const thisUser = user.id === id ? user : foreignUser;

    const index = currentPage === 1 ? 0 : (currentPage - 1) * 6;
    const beers = favoritesBeers.slice(index, index + 6);

    const length = Math.ceil(favoritesBeers.length / 6);
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
    if (
      Object.entries(user).length === 0 &&
      error === null &&
      Object.entries(foreignUser).length === 0
    ) {
      return <Loader />;
    }
    return (
      <>
        {error !== null ? (
          <ErrorBoundary error={error} />
        ) : (
          <>
            <UserInfo
              user={thisUser}
              allowed={allowed}
              handleUpload={this.handleUpload}
              handleDelete={this.handleDelete}
            />
            <UserBeerList
              beers={beers}
              handleRemove={this.handleRemove}
              favoritesBeers={favoritesBeers}
              currentPageDecrement={this.currentPageDecrement}
              allowed={allowed}
            />
            <FavoritesPagination
              userId={thisUser !== null ? thisUser.id : null}
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
  getFavorites: PropTypes.func.isRequired,
  getForeignUser: PropTypes.func.isRequired,
  foreignUser: PropTypes.objectOf(PropTypes.any).isRequired,
  allowed: PropTypes.bool.isRequired,
  removeFavorite: PropTypes.func.isRequired
};

UserPageContainer.defaultProps = {
  error: null
};

const mapStateToProps = state => {
  return {
    user: state.user.user,
    error: state.user.error,
    favoritesBeers: state.user.favoritesBeers,
    foreignUser: state.user.foreignUser,
    allowed: state.user.allowed
  };
};

export default connect(mapStateToProps, {
  getUser,
  getFavorites,
  getForeignUser,
  removeFavorite
})(UserPageContainer);
