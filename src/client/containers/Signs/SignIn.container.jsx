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
      password: ""
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
    const test = await loginUser(payload);
    if (test.status === 200) {
      this.props.saveUserSession(test.data.user);
      history.push("/search");
    }
  };

  // TODO: тебе приходит json в случае ошибки сделай типа if(success=false) { и парси контент {error} в разметку}

  render() {
    return (
      <>
        <SignInForm logUser={this.logUser} handleChange={this.handleChange} />
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
