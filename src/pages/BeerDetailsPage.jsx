import React from "react";
import { withRouter } from "react-router";
import PropTypes from "prop-types";

import Header from "../components/Header";
import SingleBeer from "../containers/BeerDetailsPage/SingleBeer.container";

class BeerDetailsPage extends React.PureComponent {
  render() {
    const { location } = this.props;
    const id = Number(location.pathname.split("/").pop());
    return (
      <>
        <Header />
        <SingleBeer id={id} />
      </>
    );
  }
}

BeerDetailsPage.propTypes = {
  location: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withRouter(BeerDetailsPage);
