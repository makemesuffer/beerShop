import React from "react";
import { withRouter } from "react-router";
import PropTypes from "prop-types";

import UserPageContainer from "../containers/UserDetailsPage/UserPage.container";
import HeaderContainer from "../containers/Header.container";

class UserDetailsPage extends React.PureComponent {
  render() {
    const { location } = this.props;
    const id = location.pathname.split("/").pop();
    return (
      <>
        <HeaderContainer />
        <UserPageContainer id={id} />
      </>
    );
  }
}

UserDetailsPage.propTypes = {
  location: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withRouter(UserDetailsPage);
