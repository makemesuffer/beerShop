import React from "react";
import { withRouter } from "react-router";
import UserPageContainer from "../containers/UserDetailsPage/UserPage.container";

class UserDetailsPage extends React.PureComponent {
  render() {
    return (
      <>
        <UserPageContainer />
      </>
    );
  }
}

export default withRouter(UserDetailsPage);
