import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroller";
import CircularProgress from "@material-ui/core/CircularProgress";

import { continueBeerName, setBeerList } from "../../store/beer/actions";
import { getBeerDetails } from "../../store/details/actions";
import { addFavorite, removeFavorite } from "../../store/favorite/actions";
import BeerGrid from "../../components/LandingPage/BeerGrid";

class BeerListContainer extends React.PureComponent {
  handleLoad = () => {
    const {
      beerList,
      value,
      page,
      alcoholValue,
      bitternessValue,
      colorValue
    } = this.props;
    if (value === "") {
      this.props.continueBeerName(null, page);
    } else {
      this.props.continueBeerName(
        value,
        page,
        alcoholValue,
        bitternessValue,
        colorValue
      );
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
  continueBeerName: PropTypes.func.isRequired,
  setBeerList: PropTypes.func.isRequired,
  hasMoreBeers: PropTypes.bool.isRequired,
  alcoholValue: PropTypes.number.isRequired,
  bitternessValue: PropTypes.number.isRequired,
  colorValue: PropTypes.number.isRequired
};

const mapStateToProps = state => {
  return {
    beerList: state.beer.beerList,
    favorites: state.favorites.favorites,
    value: state.beer.value,
    page: state.beer.page,
    hasMoreBeers: state.beer.hasMoreBeers,
    alcoholValue: state.beer.alcoholValue,
    bitternessValue: state.beer.bitternessValue,
    colorValue: state.beer.colorValue
  };
};

export default connect(mapStateToProps, {
  addFavorite,
  removeFavorite,
  continueBeerName,
  setBeerList,
  getBeerDetails
})(BeerListContainer);
