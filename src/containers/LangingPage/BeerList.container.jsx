import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroller";
import CircularProgress from "@material-ui/core/CircularProgress";

import { addBeer, deleteBeer } from "../../dataAccess/userRepository/helpers";
import { continueBeerName, setBeerList } from "../../store/beer/actions";
import { getBeerDetails } from "../../store/details/actions";
import BeerGrid from "../../components/LandingPage/BeerGrid";
import { getUser } from "../../store/user/actions";

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

  handleFavorite = async id => {
    const { user } = this.props;
    if (Object.entries(user).length !== 0) {
      if (user.beerList.includes(id)) {
        await deleteBeer({ id, userId: user.id });
        await this.props.getUser(user.id);
      } else {
        await addBeer({ id, userId: user.id });
        await this.props.getUser(user.id);
      }
    }
  };

  render() {
    const { beerList, user, hasMoreBeers } = this.props;
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
            userBeerList={user.beerList === undefined ? null : user.beerList}
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
  value: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  continueBeerName: PropTypes.func.isRequired,
  setBeerList: PropTypes.func.isRequired,
  hasMoreBeers: PropTypes.bool.isRequired,
  alcoholValue: PropTypes.number.isRequired,
  bitternessValue: PropTypes.number.isRequired,
  colorValue: PropTypes.number.isRequired,
  user: PropTypes.objectOf(PropTypes.any),
  getUser: PropTypes.func.isRequired
};

BeerListContainer.defaultProps = {
  user: null
};

const mapStateToProps = state => {
  return {
    beerList: state.beer.beerList,
    value: state.beer.value,
    page: state.beer.page,
    hasMoreBeers: state.beer.hasMoreBeers,
    alcoholValue: state.beer.alcoholValue,
    bitternessValue: state.beer.bitternessValue,
    colorValue: state.beer.colorValue,
    user: state.user.user
  };
};

export default connect(mapStateToProps, {
  continueBeerName,
  setBeerList,
  getBeerDetails,
  getUser
})(BeerListContainer);
