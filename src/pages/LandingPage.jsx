import React from "react";

import Search from "../containers/LangingPage/Search.container";
import BeerList from "../containers/LangingPage/BeerList.container";
import SignUpContainer from "../containers/SignUp.container";

class LandingPage extends React.PureComponent {
  render() {
    return (
      <>
        <SignUpContainer />
        <Search />
        <BeerList />
      </>
    );
  }
}

export default LandingPage;
