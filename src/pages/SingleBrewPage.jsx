import React from "react";
import { withRouter } from "react-router";
import PropTypes from "prop-types";

import HeaderContainer from "../containers/Header.container";
import SingleBrewContainer from "../containers/SingleBrewPage/SingleBrew.container";

class SingleBrewPage extends React.PureComponent {
  render() {
    const { location } = this.props;
    const id = location.pathname.split("/").pop();
    return (
      <>
        <HeaderContainer />
        <SingleBrewContainer id={id} />
      </>
    );
  }
}

SingleBrewPage.propTypes = {
  location: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withRouter(SingleBrewPage);
