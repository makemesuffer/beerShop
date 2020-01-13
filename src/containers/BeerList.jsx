import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroller";
import ClipLoader from "react-spinners/ClipLoader";

import { continueBeerList } from "../store/beer/actions";
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

  render() {
    const { hasMoreBeers } = this.state;
    const { beerList } = this.props;
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
              <ClipLoader size={100} color="#123abc" />
            </div>
          }
          threshold={100}
        >
          <BeerGrid beerList={beerList} />;
        </InfiniteScroll>
      );
    }
    return <> </>;
  }
}

BeerList.propTypes = {
  beerList: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = state => {
  return {
    beerList: state.beerList
  };
};

export default connect(mapStateToProps, { continueBeerList })(BeerList);
