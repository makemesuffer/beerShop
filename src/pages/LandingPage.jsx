import React from "react";

import Search from "../containers/LangingPage/Search.container";
import BeerList from "../containers/LangingPage/BeerList.container";
import HeaderContainer from "../containers/Header.container";

class LandingPage extends React.PureComponent {
  render() {
    return (
      <>
        <HeaderContainer />
        <Search />
        <BeerList />
      </>
    );
  }
}

export default LandingPage;
