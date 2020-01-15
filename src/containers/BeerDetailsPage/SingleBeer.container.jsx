import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TitleDescription from "../../components/BeerDetailsPage/TitleDescription";
import { addFavorite, removeFavorite } from "../../store/favorite/actions";
import getBeerDetails from "../../store/details/actions";
import PropertiesPairing from "../../components/BeerDetailsPage/PropertiesPairing";
import BrewingInfo from "../../components/BeerDetailsPage/BrewingInfo";

class SingleBeerContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { id } = this.props;
    this.props.getBeerDetails(id);
  }

  createTableData = (name, value, description, id) => {
    return { name, value, description, id };
  };

  createListData = (name, value, id) => {
    if (value === null) value = "NO INFO";
    else {
      value =
        value instanceof Array || value instanceof String ? value : [value];
    }
    return { name, value, id };
  };

  handleFavorite = id => {
    const { favorites } = this.props;
    if (favorites.includes(id)) this.props.removeFavorite(id);
    else this.props.addFavorite(id);
  };

  render() {
    const { favorites, details } = this.props;
    if (!details.length) {
      return null;
    }
    return (
      <>
        <TitleDescription
          favorites={favorites}
          beer={details[0]}
          handleFavorite={this.handleFavorite}
        />
        <PropertiesPairing
          beer={details[0]}
          createTableData={this.createTableData}
        />
        <BrewingInfo
          beer={details[0]}
          createTableData={this.createTableData}
          createListData={this.createListData}
        />
      </>
    );
  }
}

SingleBeerContainer.propTypes = {
  id: PropTypes.number.isRequired,
  addFavorite: PropTypes.func.isRequired,
  favorites: PropTypes.arrayOf(PropTypes.number).isRequired,
  removeFavorite: PropTypes.func.isRequired,
  getBeerDetails: PropTypes.func.isRequired,
  details: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = state => {
  return {
    beerList: state.beer.beerList,
    favorites: state.favorites.favorites,
    details: state.details.thisBeer
  };
};

export default connect(mapStateToProps, {
  addFavorite,
  removeFavorite,
  getBeerDetails
})(SingleBeerContainer);
