import React from "react";
import HeaderContainer from "../containers/Header.container";
import VerifyContainer from "../containers/Verify/Verify.container";

class VerifyPage extends React.PureComponent {
  render() {
    return (
      <>
        <HeaderContainer />
        <VerifyContainer />
      </>
    );
  }
}
export default VerifyPage;
