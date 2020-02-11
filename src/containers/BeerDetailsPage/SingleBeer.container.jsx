import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { addBeer, deleteBeer } from "../../dataAccess/userRepository/helpers";
import { getUser } from "../../store/user/actions";
import TitleDescription from "../../components/BeerDetailsPage/TitleDescription";
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
    this.props.getBeerDetailsPending(true);
    const { id } = this.props;
    setTimeout(() => {
      this.props.getBeerDetailsPending(false);
      this.props.getBeerDetails(id);
    }, 500);
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
    const { user, details, error } = this.props;
    if (error !== null) {
      return <ErrorBoundary error={error} />;
    }
    if (!details.length) {
      return <Loader />;
    }
    return (
      <>
        <TitleDescription
          userBeerList={user.beerList === undefined ? null : user.beerList}
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
  getBeerDetails: PropTypes.func.isRequired,
  details: PropTypes.arrayOf(PropTypes.object).isRequired,
  getBeerDetailsPending: PropTypes.func.isRequired,
  error: PropTypes.string,
  user: PropTypes.objectOf(PropTypes.any),
  getUser: PropTypes.func.isRequired
};

SingleBeerContainer.defaultProps = {
  user: null,
  error: null
};

const mapStateToProps = state => {
  return {
    beerList: state.beer.beerList,
    details: state.details.item,
    isBusy: state.details.isBusy,
    error: state.details.error,
    user: state.user.user
  };
};

export default connect(mapStateToProps, {
  getBeerDetails,
  getBeerDetailsPending,
  getUser
})(SingleBeerContainer);
