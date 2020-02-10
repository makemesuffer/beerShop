import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { loginUser } from "../../dataAccess/userRepository/helpers";
import { saveUserSession } from "../../store/user/actions";
import SignInForm from "../../components/Signs/SignInForm";

class SignInContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      password: "",
      error: ""
    };
  }

  handleChange = e => {
    const { name } = e.target;
    this.setState({ [name]: e.target.value });
  };

  logUser = async e => {
    e.preventDefault();
    const { history } = this.props;
    const { login, password } = this.state;
    const payload = { login, password };
    const result = await loginUser(payload);
    if (result.data.success === true) {
      this.props.saveUserSession(result.data.user);
      history.push("/search");
    } else {
      this.setState({ error: result.data.error });
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
        />
      </>
    );
  }
}

SignInContainer.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  saveUserSession: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.user.user
  };
};

export default connect(mapStateToProps, { saveUserSession })(
  withRouter(SignInContainer)
);
