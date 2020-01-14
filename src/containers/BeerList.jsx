import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroller";
import CircularProgress from "@material-ui/core/CircularProgress";

import { continueBeerList, continueBeerName } from "../store/beer/actions";
import { addFavorite, removeFavorite } from "../store/favorite/actions";
import BeerGrid from "../components/BeerGrid";

// FIXME move page to the class fields
let page = 1;
// FIXME Props validation, remove eslint errors.
// FIXME add Container word to the name of the file and class

// TODO: improve hasMoreBeers logic more
class BeerList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hasMoreBeers: true
    };
  }

  handleLoad = () => {
    page += 1;
    const { beerList, value } = this.props;
    console.log(value, "IN LIST");

    // типа если прибавился ленгс массива - то хес мор бирс остается тру, иначе фолс после 1 проверки и спиннер убирается
    if (value === "") {
      // eslint-disable-next-line react/prop-types,react/destructuring-assignment
      this.props.continueBeerList(page);
    } else {
      // eslint-disable-next-line react/destructuring-assignment,react/prop-types
      this.props.continueBeerName(value, page);
    }
    if (beerList.length < 9) {
      this.setState({ hasMoreBeers: false });
    } else {
      this.setState({ hasMoreBeers: true });
    }
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
  favorites: PropTypes.arrayOf(PropTypes.number).isRequired,
  value: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  return {
    beerList: state.beer.beerList,
    favorites: state.favorites.favorites,
    value: state.beer.value
  };
};

export default connect(mapStateToProps, {
  continueBeerList,
  addFavorite,
  removeFavorite,
  continueBeerName
})(BeerList);
