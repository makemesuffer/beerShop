import React from "react";
import SignUpContainer from "../containers/Signs/SignUp.container";
import HeaderContainer from "../containers/Header.container";

class SignUpPage extends React.PureComponent {
  render() {
    return (
      <>
        <HeaderContainer />
        <SignUpContainer />
      </>
    );
  }
}
export default SignUpPage;
