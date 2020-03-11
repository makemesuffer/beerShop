import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import PropTypes from "prop-types";
import SignUpForm from "../../components/Signs/SignUpForm";
import { userCreate } from "../../braveNewStore/userDetails/actions";

class SignUpContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      login: "",
      birthDate: "",
      password: ""
    };
  }

  handleChange = e => {
    const { name } = e.target;
    this.setState({ [name]: e.target.value });
  };

  addUser = async e => {
    e.preventDefault();
    const { history } = this.props;
    const { firstName, lastName, login, birthDate, password } = this.state;
    const payload = { login, password, firstName, lastName, birthDate };
    await this.props.userCreate(payload);
    const { error } = this.props;
    console.log(error);
    if (error === null) {
      history.push("/search");
    }
  };

  render() {
    const { error } = this.props;
    return (
      <>
        <SignUpForm
          addUser={this.addUser}
          handleChange={this.handleChange}
          error={error}
        />
      </>
    );
  }
}

SignUpContainer.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  userCreate: PropTypes.func.isRequired,
  error: PropTypes.string
};

SignUpContainer.defaultProps = {
  error: null
};

const mapStateToProps = state => {
  return {
    error: state.userDetails.error
  };
};

export default connect(mapStateToProps, { userCreate })(
  withRouter(SignUpContainer)
);
