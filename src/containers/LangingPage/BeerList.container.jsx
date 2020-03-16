import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroller";
import CircularProgress from "@material-ui/core/CircularProgress";

import { continueBeerList } from "../../braveNewStore/beerList/actions";
import { setScroll, setPage } from "../../braveNewStore/searchValues/actions";
import { updateUser } from "../../braveNewStore/userDetails/actions";
import { addBeer, deleteBeer } from "../../dataAccess/userRepository/helpers";
import BeerGrid from "../../components/LandingPage/BeerGrid";
import Loader from "../../components/Loader";

class BeerListContainer extends React.PureComponent {
  handleLoad = async () => {
    const {
      beerList,
      value,
      page,
      alcoholValue,
      bitternessValue,
      colorValue
    } = this.props;
    await this.props.continueBeerList({
      perPage: 9,
      page,
      name: value === "" ? null : value,
      abv: alcoholValue,
      ibu: bitternessValue,
      ebc: colorValue
    });
    await this.props.setPage({ page: page + 1 });
    if (beerList.length < 9) {
      this.props.setScroll({ hasMoreBeers: false });
    }
  };

  handleFavorite = async id => {
    const { user } = this.props;
    if (user !== null) {
      if (user.beerList.includes(id)) {
        await deleteBeer({ id, userId: user.id });
        const updatedFavorites = user.beerList.filter(elem => elem !== id);
        await this.props.updateUser({ beerList: updatedFavorites });
      } else {
        await addBeer({ id, userId: user.id });
        const updatedFavorites = [...user.beerList];
        updatedFavorites.push(id);
        await this.props.updateUser({ beerList: updatedFavorites });
      }
    }
  };

  render() {
    const { beerList, user, hasMoreBeers, isBusy } = this.props;
    if (isBusy === true) {
      return <Loader />;
    }
    if (beerList.length !== 0) {
      return (
        <InfiniteScroll
          pageStart={0}
          loadMore={this.handleLoad}
          hasMore={hasMoreBeers}
          loader={
            <div style={{ textAlign: "center" }} key={0}>
              <CircularProgress />
            </div>
          }
          threshold={100}
        >
          <BeerGrid
            userBeerList={user === null ? null : user.beerList}
            beerList={beerList}
            handleFavorite={this.handleFavorite}
          />
        </InfiniteScroll>
      );
    }
    return <> </>;
  }
}

BeerListContainer.propTypes = {
  beerList: PropTypes.arrayOf(PropTypes.object).isRequired,
  value: PropTypes.string,
  page: PropTypes.number,
  continueBeerList: PropTypes.func.isRequired,
  setScroll: PropTypes.func.isRequired,
  hasMoreBeers: PropTypes.bool,
  alcoholValue: PropTypes.number,
  bitternessValue: PropTypes.number,
  colorValue: PropTypes.number,
  user: PropTypes.objectOf(PropTypes.any),
  updateUser: PropTypes.func.isRequired,
  isBusy: PropTypes.bool.isRequired,
  setPage: PropTypes.func.isRequired
};

BeerListContainer.defaultProps = {
  user: null,
  value: "",
  page: 2,
  hasMoreBeers: true,
  alcoholValue: 2,
  bitternessValue: 0,
  colorValue: 4
};

const mapStateToProps = state => {
  return {
    beerList: state.beerList.items,
    isBusy: state.beerList.isBusy,
    alcoholValue: state.searchValues.model.alcoholValue,
    bitternessValue: state.searchValues.model.bitternessValue,
    colorValue: state.searchValues.model.colorValue,
    page: state.searchValues.model.page,
    value: state.searchValues.model.value,
    user: state.userDetails.model
  };
};

/*
  user: state.user.user,
    rememberMe: state.user.rememberMe
 */

export default connect(mapStateToProps, {
  continueBeerList,
  setScroll,
  setPage,
  updateUser
})(BeerListContainer);
