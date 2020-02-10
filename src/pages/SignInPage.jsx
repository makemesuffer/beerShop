import React from "react";
import HeaderContainer from "../containers/Header.container";
import SignInContainer from "../containers/Signs/SignIn.container";

class SignInPage extends React.PureComponent {
  render() {
    return (
      <>
        <HeaderContainer />
        <SignInContainer />
      </>
    );
  }
}
export default SignInPage;
