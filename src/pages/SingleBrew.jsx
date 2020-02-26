import React from "react";
import { withRouter } from "react-router";
import PropTypes from "prop-types";

import SingleBeer from "../containers/BeerDetailsPage/SingleBeer.container";
import HeaderContainer from "../containers/Header.container";

class SingleBrew extends React.PureComponent {
  render() {
    const { location } = this.props;
    const id = Number(location.pathname.split("/").pop());
    return (
      <>
        <HeaderContainer />
        <SingleBeer id={id} />
      </>
    );
  }
}

SingleBrew.propTypes = {
  location: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withRouter(SingleBrew);
