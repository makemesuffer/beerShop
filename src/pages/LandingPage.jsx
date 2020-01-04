import React from "react";

import Header from "../components/Header";
import Input from "../components/Input";
import Catalog from "../containers/Catalog";

// eslint-disable-next-line react/prefer-stateless-function
class LandingPage extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Input />
        <Catalog />
      </>
    );
  }
}

export default LandingPage;
