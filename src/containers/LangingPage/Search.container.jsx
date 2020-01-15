import * as React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  getBeerList,
  getBeerName,
  getInputValue,
  setFilters,
  filterBeer
} from "../../store/beer/actions";
import Input from "../../components/LandingPage/Input";
import Filters from "../../components/LandingPage/Filters";

class SearchContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      alcoholValue: 2,
      bitternessValue: 0,
      colorValue: 4,
      value: ""
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const { value } = this.state;
    this.props.getInputValue(value);
    if (value === "") this.props.getBeerList();
    else this.props.getBeerName(value);
  };

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  handleSliderChange = (event, valya) => {
    const name = event.target.offsetParent.title;
    this.setState({ [name]: valya });
    const { value, colorValue, bitternessValue, alcoholValue } = this.state;
    this.props.filterBeer(value, alcoholValue, bitternessValue, colorValue);
  };

  // FIXME one container -- one component
  render() {
    const { alcoholValue, bitternessValue, colorValue, value } = this.state;

    const { showFilters } = this.props;
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

SearchContainer.propTypes = {
  getInputValue: PropTypes.func.isRequired,
  getBeerList: PropTypes.func.isRequired,
  getBeerName: PropTypes.func.isRequired,
  showFilters: PropTypes.bool.isRequired,
  filterBeer: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    beerList: state.beer.beerList,
    showFilters: state.beer.showFilters
  };
};

export default connect(mapStateToProps, {
  getBeerList,
  getBeerName,
  getInputValue,
  setFilters,
  filterBeer
})(SearchContainer);
