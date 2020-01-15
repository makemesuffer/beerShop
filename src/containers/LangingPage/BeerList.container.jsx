import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroller";
import CircularProgress from "@material-ui/core/CircularProgress";

import {
  continueBeerList,
  continueBeerName,
  setBeerList
} from "../../store/beer/actions";
import getBeerDetails from "../../store/details/actions";
import { addFavorite, removeFavorite } from "../../store/favorite/actions";
import BeerGrid from "../../components/LandingPage/BeerGrid";

class BeerListContainer extends React.PureComponent {
  handleLoad = () => {
    const { beerList, value, page } = this.props;
    if (value === "") {
      this.props.continueBeerList(page);
    } else {
      this.props.continueBeerName(value, page);
    }
    if (beerList.length < 9) {
      this.props.setBeerList(false);
    }
  };

  handleFavorite = id => {
    const { favorites } = this.props;
    if (favorites.includes(id)) this.props.removeFavorite(id);
    else this.props.addFavorite(id);
  };

  render() {
    const { beerList, favorites, hasMoreBeers } = this.props;
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
            favorites={favorites}
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
  addFavorite: PropTypes.func.isRequired,
  removeFavorite: PropTypes.func.isRequired,
  favorites: PropTypes.arrayOf(PropTypes.number).isRequired,
  value: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  continueBeerList: PropTypes.func.isRequired,
  continueBeerName: PropTypes.func.isRequired,
  setBeerList: PropTypes.func.isRequired,
  hasMoreBeers: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    beerList: state.beer.beerList,
    favorites: state.favorites.favorites,
    value: state.beer.value,
    page: state.beer.page,
    hasMoreBeers: state.beer.hasMoreBeers
  };
};

export default connect(mapStateToProps, {
  continueBeerList,
  addFavorite,
  removeFavorite,
  continueBeerName,
  setBeerList,
  getBeerDetails
})(BeerListContainer);
