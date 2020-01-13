import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroller";
import CircularProgress from "@material-ui/core/CircularProgress";

import { continueBeerList } from "../store/beer/actions";
import { addFavorite, removeFavorite } from "../store/favorite/actions";
import BeerGrid from "../components/BeerGrid";

let page = 1;

class BeerList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hasMoreBeers: true
    };
  }

  handleLoad = () => {
    page += 1;
    // eslint-disable-next-line react/prop-types,react/destructuring-assignment
    this.props.continueBeerList(page);
  };

  handleAdd = id => {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.addFavorite(id);
  };

  handleRemove = id => {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.removeFavorite(id);
  };

  render() {
    const { hasMoreBeers } = this.state;
    const { beerList, favorites } = this.props;
    if (beerList.length !== 0) {
      return (
        <InfiniteScroll
          pageStart={0}
          loadMore={() => {
            this.handleLoad(page);
          }}
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
            handleAdd={this.handleAdd}
            handleRemove={this.handleRemove}
          />
          ;
        </InfiniteScroll>
      );
    }
    return <> </>;
  }
}

BeerList.propTypes = {
  beerList: PropTypes.arrayOf(PropTypes.object).isRequired,
  addFavorite: PropTypes.func.isRequired,
  removeFavorite: PropTypes.func.isRequired,
  favorites: PropTypes.arrayOf(PropTypes.number).isRequired
};

const mapStateToProps = state => {
  return {
    beerList: state.beer.beerList,
    favorites: state.favorites.favorites
  };
};

export default connect(mapStateToProps, {
  continueBeerList,
  addFavorite,
  removeFavorite
})(BeerList);
