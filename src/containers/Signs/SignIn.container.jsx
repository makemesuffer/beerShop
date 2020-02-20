import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { saveUserSession } from "../../store/user/actions";
import SignInForm from "../../components/Signs/SignInForm";

class SignInContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      password: "",
      rememberMe: false,
      error: null
    };
  }

  handleChange = e => {
    const { name } = e.target;
    this.setState({ [name]: e.target.value });
  };

  handleSwitch = () => {
    const { rememberMe } = this.state;
    this.setState({ rememberMe: !rememberMe });
  };

  logUser = async e => {
    e.preventDefault();
    const { history } = this.props;
    const { login, password, rememberMe } = this.state;
    const payload = { login, password };
    await this.props.saveUserSession({
      payload,
      rememberMe
    });
    const { error } = this.props;
    if (error === null) {
      history.push("/search");
    } else {
      this.setState({ error });
    }
  };

  render() {
    const { error } = this.state;
    return (
      <>
        <SignInForm
          logUser={this.logUser}
          handleChange={this.handleChange}
          error={error}
          handleSwitch={this.handleSwitch}
        />
      </>
    );
  }
}

SignInContainer.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  saveUserSession: PropTypes.func.isRequired,
  error: PropTypes.string
};

SignInContainer.defaultProps = {
  error: null
};

const mapStateToProps = state => {
  return {
    user: state.user.user,
    error: state.user.error
  };
};

export default connect(mapStateToProps, { saveUserSession })(
  withRouter(SignInContainer)
);
