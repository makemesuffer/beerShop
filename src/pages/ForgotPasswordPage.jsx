import React from "react";

import HeaderContainer from "../containers/Header.container";
import ForgotPasswordContainer from "../containers/ForgotPasswordPage/ForgotPassword.container";

class ForgotPasswordPage extends React.PureComponent {
  render() {
    return (
      <>
        <HeaderContainer />
        <ForgotPasswordContainer />
      </>
    );
  }
}

export default ForgotPasswordPage;
