import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { addBeer, deleteBeer } from "../../dataAccess/userRepository/helpers";
import TitleDescription from "../../components/BeerDetailsPage/TitleDescription";
import getBeerDetails from "../../braveNewStore/beerDetails/actions";
import { saveUserProgress } from "../../store/user/actions";
import PropertiesPairing from "../../components/BeerDetailsPage/PropertiesPairing";
import BrewingInfo from "../../components/BeerDetailsPage/BrewingInfo";
import Loader from "../../components/Loader";

class SingleBeerContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { id } = this.props;
    const waitUser = async () => {
      await this.props.getBeerDetails(id);
    };
    waitUser();
  }

  createListData = (name, value, description) => {
    if (name !== "Yeast" && name !== "Water") {
      if (value === null) value = "NO INFO";
      else {
        value =
          value instanceof Array || value instanceof String ? value : [value];
      }
    }

    return { name, value, description };
  };

  handleFavorite = async id => {
    const { user, rememberMe } = this.props;
    if (user !== null) {
      if (user.beerList.includes(id)) {
        await deleteBeer({ id, userId: user.id });
        await this.props.saveUserProgress(user, rememberMe);
      } else {
        await addBeer({ id, userId: user.id });
        await this.props.saveUserProgress(user, rememberMe);
      }
    }
  };

  render() {
    const { user, details, isBusy } = this.props;
    if (isBusy === true) {
      return <Loader />;
    }
    return (
      <>
        <TitleDescription
          userBeerList={user === null ? null : user.beerList}
          beer={details}
          handleFavorite={this.handleFavorite}
        />
        <PropertiesPairing
          beer={details}
          createTableData={this.createListData}
        />
        <BrewingInfo beer={details} createListData={this.createListData} />
      </>
    );
  }
}

SingleBeerContainer.propTypes = {
  id: PropTypes.number.isRequired,
  getBeerDetails: PropTypes.func.isRequired,
  details: PropTypes.objectOf(PropTypes.any),
  user: PropTypes.objectOf(PropTypes.any),
  saveUserProgress: PropTypes.func.isRequired,
  isBusy: PropTypes.bool.isRequired,
  rememberMe: PropTypes.bool
};

SingleBeerContainer.defaultProps = {
  user: null,
  details: null,
  rememberMe: undefined
};

const mapStateToProps = state => {
  return {
    details: state.beerDetails.model,
    isBusy: state.beerDetails.isBusy,
    error: state.beerDetails.error
  };
};

/*
    beerList: state.beerList.model, - К ЮЗЕРУ
    user: state.user.user,
    rememberMe: state.user.rememberMe
 */

export default connect(mapStateToProps, {
  getBeerDetails,
  saveUserProgress
})(SingleBeerContainer);
