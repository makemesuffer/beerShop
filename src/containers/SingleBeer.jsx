import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TitleDescription from "../components/TitleDescription";
import { continueBeerList } from "../store/beer/actions";
import PropertiesPairing from "../components/PropertiesPairing";

class SingleBeer extends React.PureComponent {
  render() {
    const { beerList, id } = this.props;
    const beer = beerList.filter(elem => {
      return elem.id === id;
    });
    return (
      <>
        <TitleDescription beer={beer[0]} />
        <PropertiesPairing beer={beer[0]} />
      </>
    );
  }
}

SingleBeer.propTypes = {
  beerList: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.number.isRequired
};

const mapStateToProps = state => {
  return {
    beerList: state.beerList
  };
};

export default connect(mapStateToProps, { continueBeerList })(SingleBeer);
