import React from "react";

import Header from "../components/Header";
import Search from "../containers/Search";
import BeerList from "../containers/BeerList";

// eslint-disable-next-line react/prefer-stateless-function
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
