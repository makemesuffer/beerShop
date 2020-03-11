import * as React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import debounce from "lodash/debounce";

import {
  setValue,
  setFilters,
  setParams
} from "../../braveNewStore/searchValues/actions";
import { getBeerList } from "../../braveNewStore/beerList/actions";
import Input from "../../components/LandingPage/Input";
import Filters from "../../components/LandingPage/Filters";

class SearchContainer extends React.PureComponent {
  filterResult = debounce(async () => {
    const { value } = this.props;
    const { colorValue, bitternessValue, alcoholValue } = this.state;
    await this.props.setParams({ alcoholValue, bitternessValue, colorValue });
    await this.props.getBeerList({
      perPage: 9,
      page: null,
      name: value === "" ? null : value,
      abv: alcoholValue,
      ibu: bitternessValue,
      ebc: colorValue
    });
  }, 500);

  getResults = debounce(async () => {
    const { value } = this.state;
    this.props.setValue({ value });
    await this.props.getBeerList({
      perPage: 9,
      page: null,
      name: value === "" ? null : value
    });
    await this.props.setFilters({ showFilters: true });
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
  setValue: PropTypes.func.isRequired,
  showFilters: PropTypes.bool,
  getBeerList: PropTypes.func.isRequired,
  value: PropTypes.string,
  setFilters: PropTypes.func.isRequired,
  setParams: PropTypes.func.isRequired
};

SearchContainer.defaultProps = {
  showFilters: false,
  value: ""
};

const mapStateToProps = state => {
  return {
    beerList: state.beerList.items,
    showFilters: state.searchValues.model.showFilters,
    value: state.searchValues.model.value
  };
};

export default connect(mapStateToProps, {
  setFilters,
  setParams,
  setValue,
  getBeerList
})(SearchContainer);
