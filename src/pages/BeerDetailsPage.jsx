import React from "react";
import Header from "../components/Header";
import SingleBeer from "../containers/SingleBeer";

class BeerDetailsPage extends React.PureComponent {
  render() {
    const id = Number(window.location.href.split("/").pop());
    return (
      <>
        <Header />
        <SingleBeer id={id} />
      </>
    );
  }
}

export default BeerDetailsPage;
