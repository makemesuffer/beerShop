import React from "react";
import SignUpForm from "../components/Signs/SignUpForm";
import HeaderContainer from "../containers/Header.container";

class SignUpPage extends React.PureComponent {
  render() {
    return (
      <>
        <HeaderContainer />
        <SignUpForm />
      </>
    );
  }
}
export default SignUpPage;
