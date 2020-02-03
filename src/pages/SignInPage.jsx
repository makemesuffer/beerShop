import React from "react";
import SignInForm from "../components/Signs/SignInForm";
import HeaderContainer from "../containers/Header.container";

class SignInPage extends React.PureComponent {
  render() {
    return (
      <>
        <HeaderContainer />
        <SignInForm />
      </>
    );
  }
}
export default SignInPage;
