import React from "react";
import { withRouter } from "react-router";
import PropTypes from "prop-types";

import HeaderContainer from "../containers/Header.container";
import ChangePasswordContainer from "../containers/ChangePasswordPage/ChangePassword.container";

class ChangePasswordPage extends React.PureComponent {
  render() {
    const { location } = this.props;
    const id = location.pathname
      .split("/")
      .splice(2, 1)
      .join("");
    return (
      <>
        <HeaderContainer />
        <ChangePasswordContainer id={id} />
      </>
    );
  }
}

ChangePasswordPage.propTypes = {
  location: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withRouter(ChangePasswordPage);
