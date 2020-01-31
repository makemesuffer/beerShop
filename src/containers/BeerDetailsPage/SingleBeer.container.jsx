import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TitleDescription from "../../components/BeerDetailsPage/TitleDescription";
import { addFavorite, removeFavorite } from "../../store/favorite/actions";
import {
  getBeerDetails,
  getBeerDetailsPending
} from "../../store/details/actions";
import PropertiesPairing from "../../components/BeerDetailsPage/PropertiesPairing";
import BrewingInfo from "../../components/BeerDetailsPage/BrewingInfo";
import Loader from "../../components/Loader";
import ErrorBoundary from "../../components/ErrorBoundary";

class SingleBeerContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { id } = this.props;
    setTimeout(() => {
      this.props.getBeerDetailsPending(false);
      this.props.getBeerDetails(id);
    }, 3000);
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
    const { favorites, details, error } = this.props;
    if (error !== null) {
      return <ErrorBoundary error={error} />;
    }
    if (!details.length) {
      return <Loader />;
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
  details: PropTypes.arrayOf(PropTypes.object).isRequired,
  getBeerDetailsPending: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.string])
    .isRequired
};

const mapStateToProps = state => {
  return {
    beerList: state.beer.beerList,
    favorites: state.favorites.favorites,
    details: state.details.item,
    isBusy: state.details.isBusy,
    error: state.details.error
  };
};

export default connect(mapStateToProps, {
  addFavorite,
  removeFavorite,
  getBeerDetails,
  getBeerDetailsPending
})(SingleBeerContainer);
