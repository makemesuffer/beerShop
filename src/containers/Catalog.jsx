import * as React from "react";
// import { makeStyles } from "@material-ui/core";
// import PropTypes from "prop-types";
import { connect } from "react-redux";

import testingApi from "../store/beer/actions";

class Catalog extends React.PureComponent {
  handleClick = () => {
    console.log("click");
    // eslint-disable-next-line react/prop-types,react/destructuring-assignment
    this.props.testingApi();
  };

  render() {
    return (
      <>
        <button type="button" onClick={this.handleClick}>
          {" "}
          Проверяем тут апиху хотя должны были в импуте его проверить логика то
          импутовская бля
        </button>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    testing: state.testing
  };
};

export default connect(mapStateToProps, { testingApi })(Catalog);
