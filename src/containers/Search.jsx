import * as React from "react";
import { connect } from "react-redux";

import { getBeerList } from "../store/beer/actions";
import Input from "../components/Input";
import Filters from "../components/Filters";

class Search extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showFilters: false,
      alcoholValue: 2,
      bitternessValue: 0,
      colorValue: 4
    };
  }

  handleClick = e => {
    e.preventDefault();
    // eslint-disable-next-line react/prop-types,react/destructuring-assignment
    this.props.getBeerList();
    this.setState({ showFilters: true });
  };

  handleSliderChange = (event, value) => {
    const name = event.target.offsetParent.title;
    this.setState({ [name]: value });
  };

  render() {
    const {
      showFilters,
      alcoholValue,
      bitternessValue,
      colorValue
    } = this.state;
    return (
      <>
        <Input handleClick={this.handleClick} />
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
    beerList: state.beerList
  };
};

export default connect(mapStateToProps, { getBeerList })(Search);
