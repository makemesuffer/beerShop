import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import UserInfo from "../../components/UserDetailsPage/UserInfo";
import { getFavoritesById, saveUserProgress } from "../../store/user/actions";
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
    // const {id} = this.props
    const { user } = this.props;
    const getUserBeerList = async () => {
      await this.props.getFavoritesById(user.beerList);
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
    const { user, rememberMe } = this.props;
    await deleteBeer({ id, userId: user.id });
    await this.props.saveUserProgress(user, rememberMe);
    const { user: newUser } = this.props;
    await this.props.getFavoritesById(newUser.beerList);
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
        await getFavoritesById(user.beerList);
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
    const result = await deleteImage(payload);
    if (result.data.success === true) {
      await getFavoritesById(user.beerList);
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
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  error: PropTypes.string,
  favoritesBeers: PropTypes.arrayOf(PropTypes.object).isRequired,
  foreignUser: PropTypes.objectOf(PropTypes.any).isRequired,
  allowed: PropTypes.bool.isRequired,
  getFavoritesById: PropTypes.func.isRequired,
  rememberMe: PropTypes.bool.isRequired,
  saveUserProgress: PropTypes.func.isRequired
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
    allowed: state.user.allowed,
    rememberMe: state.user.rememberMe
  };
};

export default connect(mapStateToProps, {
  saveUserProgress,
  getFavoritesById
})(UserPageContainer);
