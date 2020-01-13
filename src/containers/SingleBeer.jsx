import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TitleDescription from "../components/TitleDescription";
import { continueBeerList } from "../store/beer/actions";
import PropertiesPairing from "../components/PropertiesPairing";
import BrewingInfo from "../components/BrewingInfo";

class SingleBeer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  createData = (name, value, description) => {
    return { name, value, description };
  };

  createSykaData = (name, value) => {
    // eslint-disable-next-line no-param-reassign
    if (value === null) value = "NO INFO";
    // eslint-disable-next-line no-param-reassign
    value =
      value instanceof Array || value instanceof String || value === null
        ? value
        : [value];
    return { name, value };
  };

  render() {
    const { beerList, id } = this.props;
    const beer = beerList.filter(elem => {
      return elem.id === id;
    });
    return (
      <>
        <TitleDescription beer={beer[0]} />
        <PropertiesPairing beer={beer[0]} createData={this.createData} />
        <BrewingInfo
          beer={beer[0]}
          createData={this.createData}
          createSykaData={this.createSykaData}
        />
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
