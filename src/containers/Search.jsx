import * as React from "react";
import { connect } from "react-redux";

import { getBeerList, getBeerName, getInputValue } from "../store/beer/actions";
import Input from "../components/Input";
import Filters from "../components/Filters";

class Search extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showFilters: false,
      alcoholValue: 2,
      bitternessValue: 0,
      colorValue: 4,
      value: ""
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const { value } = this.state;
    console.log(value);
    // eslint-disable-next-line react/prop-types,react/destructuring-assignment
    this.props.getInputValue(value);
    // eslint-disable-next-line react/prop-types,react/destructuring-assignment
    if (value === "") this.props.getBeerList();
    // eslint-disable-next-line react/prop-types,react/destructuring-assignment
    this.props.getBeerName(value);
    this.setState({ showFilters: true, value: "" });
  };

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  handleSliderChange = (event, value) => {
    const name = event.target.offsetParent.title;
    this.setState({ [name]: value });
  };

  // FIXME one container -- one component
  render() {
    const {
      showFilters,
      alcoholValue,
      bitternessValue,
      colorValue,
      value
    } = this.state;
    return (
      <>
        <Input
          handleSubmit={this.handleSubmit}
          value={value}
          handleChange={this.handleChange}
        />
        <Filters
          showFilters={showFilters}
          alcoholValue={alcoholValue}
          bitternessValue={bitternessValue}
          colorValue={colorValue}
          handleSliderChange={this.handleSliderChange}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    beerList: state.beer.beerList
  };
};

export default connect(mapStateToProps, {
  getBeerList,
  getBeerName,
  getInputValue
})(Search);
