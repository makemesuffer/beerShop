import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import UserInfo from "../../components/UserDetailsPage/UserInfo";
import Loader from "../../components/Loader";
import UserBeerList from "../../components/UserDetailsPage/UserBeerList";
import {
  getFavorites,
  changeFavorites
} from "../../braveNewStore/favoritesList/actions";
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
    const { user } = this.props;
    const getUserBeerList = async () => {
      await this.props.getFavorites(user.beerList);
    };
    if (user !== null) getUserBeerList();
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
    const { user, favoritesBeers } = this.props;
    await deleteBeer({ id, userId: user.id });
    const updatedFavorites = favoritesBeers.filter(elem => elem.id !== id);
    await this.props.changeFavorites(updatedFavorites);
  };

  handleUpload = async e => {
    e.preventDefault();
    const { user } = this.props;
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = async () => {
      const payload = { userId: user.id, img: reader.result };
      const result = await uploadImage(payload);
      if (result.data.success === true) {
        await getFavorites(user.beerList);
      }
    };

    reader.readAsDataURL(file);
  };

  handleDelete = async e => {
    e.preventDefault();
    const { user } = this.props;
    const imgId = user.profilePicture
      .split("/")
      .pop()
      .split(".")
      .shift();
    const payload = { userId: user.id, imgId };
    await deleteImage(payload);
  };

  render() {
    const { currentPage } = this.state;
    const { user, error, favoritesBeers, isBusy } = this.props;

    if (isBusy === true || user === null) {
      return <Loader />;
    }

    const thisUser = user;

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

    return (
      <>
        {error !== null ? (
          <> </>
        ) : (
          <>
            <UserInfo
              user={thisUser}
              // allowed={allowed}
              handleUpload={this.handleUpload}
              handleDelete={this.handleDelete}
            />
            <UserBeerList
              beers={beers}
              handleRemove={this.handleRemove}
              favoritesBeers={favoritesBeers}
              currentPageDecrement={this.currentPageDecrement}
              // allowed={allowed}
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
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  error: PropTypes.string,
  favoritesBeers: PropTypes.arrayOf(PropTypes.object).isRequired,
  getFavorites: PropTypes.func.isRequired,
  isBusy: PropTypes.bool.isRequired,
  changeFavorites: PropTypes.func.isRequired
};

UserPageContainer.defaultProps = {
  error: null
};

const mapStateToProps = state => {
  return {
    user: state.userDetails.model,
    error: state.userDetails.error,
    favoritesBeers: state.favorites.items,
    isBusy: state.userDetails.isBusy
  };
};

export default connect(mapStateToProps, {
  getFavorites,
  changeFavorites
})(UserPageContainer);
