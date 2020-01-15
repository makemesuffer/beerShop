import React from "react";

import Header from "../components/Header";
import Search from "../containers/LangingPage/Search.container";
import BeerList from "../containers/LangingPage/BeerList.container";

class LandingPage extends React.PureComponent {
  render() {
    return (
      <>
        <Header />
        <Search />
        <BeerList />
      </>
    );
  }
}

export default LandingPage;
