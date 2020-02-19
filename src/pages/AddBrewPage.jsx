import React from "react";

import HeaderContainer from "../containers/Header.container";
import AddBrewContainer from "../containers/AddBrewPage/AddBrew.container";

class AddBrewPage extends React.PureComponent {
  render() {
    return (
      <>
        <HeaderContainer />
        <AddBrewContainer />
      </>
    );
  }
}

export default AddBrewPage;
