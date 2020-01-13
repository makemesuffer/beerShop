import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TitleDescription from "../components/TitleDescription";
import { addFavorite, removeFavorite } from "../store/favorite/actions";
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
    value = value instanceof Array || value instanceof String ? value : [value];
    return { name, value };
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
    const { beerList, id, favorites } = this.props;
    const beer = beerList.filter(elem => {
      return elem.id === id;
    });
    return (
      <>
        <TitleDescription
          favorites={favorites}
          beer={beer[0]}
          handleAdd={this.handleAdd}
          handleRemove={this.handleRemove}
        />
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
  id: PropTypes.number.isRequired,
  addFavorite: PropTypes.func.isRequired,
  favorites: PropTypes.arrayOf(PropTypes.number).isRequired,
  removeFavorite: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    beerList: state.beer.beerList,
    favorites: state.favorites.favorites
  };
};

export default connect(mapStateToProps, { addFavorite, removeFavorite })(
  SingleBeer
);
