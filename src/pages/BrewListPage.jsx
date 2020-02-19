import React from "react";

import HeaderContainer from "../containers/Header.container";
import BrewListContainer from "../containers/BrewListPage/BrewList.container";

class BrewListPage extends React.PureComponent {
  render() {
    return (
      <>
        <HeaderContainer />
        <BrewListContainer />
      </>
    );
  }
}

export default BrewListPage;
