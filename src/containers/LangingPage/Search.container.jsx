import * as React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import debounce from "lodash/debounce";

import {
  setValueSuccess,
  setFilters,
  getBeer,
  setFiltersValue
} from "../../store/beer/actions";
import Input from "../../components/LandingPage/Input";
import Filters from "../../components/LandingPage/Filters";

class SearchContainer extends React.PureComponent {
  filterResult = debounce(() => {
    const { value } = this.props;
    const { colorValue, bitternessValue, alcoholValue } = this.state;
    this.props.setFiltersValue([alcoholValue, bitternessValue, colorValue]);
    this.props.getBeer(
      9,
      null,
      value,
      alcoholValue,
      bitternessValue,
      colorValue
    );
  }, 500);

  getResults = debounce(() => {
    const { value } = this.state;
    this.props.setValueSuccess(value);
    if (value === "") this.props.getBeer(9);
    else this.props.getBeer(9, null, value);
  }, 500);

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
    this.getResults();
  };

  handleChange = e => {
    this.setState({ value: e.target.value });
    this.getResults();
  };

  handleSliderChange = (event, value) => {
    const name = event.target.offsetParent.title;
    this.setState({ [name]: value });
    this.filterResult();
  };

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
  setValueSuccess: PropTypes.func.isRequired,
  showFilters: PropTypes.bool.isRequired,
  getBeer: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  setFiltersValue: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    beerList: state.beer.beerList,
    showFilters: state.beer.showFilters,
    value: state.beer.value
  };
};

export default connect(mapStateToProps, {
  setValueSuccess,
  setFilters,
  getBeer,
  setFiltersValue
})(SearchContainer);
