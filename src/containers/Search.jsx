import * as React from "react";
import { connect } from "react-redux";

import getBeerList from "../store/beer/actions";
import Input from "../components/Input";
import Filters from "../components/Filters";

class Search extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showFilters: false
    };
  }

  handleClick = e => {
    e.preventDefault();
    // eslint-disable-next-line react/prop-types,react/destructuring-assignment
    this.props.testingApi();
    this.setState({ showFilters: true });
  };

  render() {
    const { showFilters } = this.state;
    return (
      <>
        <Input handleClick={this.handleClick} />
        <Filters showFilters={showFilters} />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    beerList: state.beerList
  };
};

export default connect(mapStateToProps, { testingApi: getBeerList })(Search);
