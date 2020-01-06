import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";

import getBeerList from "../store/beer/actions";
import BeerItem from "../components/BeerItem";

class BeerList extends React.PureComponent {
  render() {
    const { beerList } = this.props;
    // TODO: Another component, grid layout. BeerList => BeerGrid => BeerItem
    return (
      <Grid
        container
        spacing={2}
        style={{
          maxWidth: "1200px",
          justifyContent: "center",
          margin: "0 auto",
          marginTop: "2%"
        }}
      >
        {beerList.map(elem => {
          return (
            <Grid style={{ textAlign: "center" }} key={elem.id} item xs={4}>
              <BeerItem beer={elem} />
            </Grid>
          );
        })}
      </Grid>
    );
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

export default connect(mapStateToProps, { getBeerList })(BeerList);
