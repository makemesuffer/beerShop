import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import EmailInput from "../../components/ForgotPasswordPage/EmailInput";
import {
  forgotPassword,
  checkMessage,
  replacePassword
} from "../../dataAccess/userRepository/helpers";

class ForgotPasswordContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      error: "",
      appear: false,
      code: "",
      pass: false,
      newPassword: "",
      repeatPassword: "",
      success: "",
      id: ""
    };
  }

  handleChange = e => {
    const { name } = e.target;
    this.setState({ [name]: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { email } = this.state;
    const payload = { email };
    const message = await forgotPassword(payload);
    if (message.data.success === true) {
      this.setState({ appear: true });
    } else {
      this.setState({ error: message.data.error });
    }
  };

  handleCheck = async e => {
    e.preventDefault();
    const { code } = this.state;
    console.log(code);
    const message = await checkMessage({ code });
    if (message.data.success === true) {
      this.setState({ pass: true, id: message.data.id });
    } else {
      this.setState({ error: message.data.error });
    }
  };

  handleChangePass = async e => {
    e.preventDefault();
    const { history } = this.props;
    const { id, newPassword, repeatPassword } = this.state;
    const payload = { id, newPassword, repeatPassword };
    const message = await replacePassword(payload);
    if (message.data.success === true) {
      this.setState({ success: message.data.message });
      setTimeout(() => {
        history.replace("/login");
      }, 3000);
    } else {
      this.setState({ error: message.data.error });
    }
  };

  render() {
    const { appear, error, pass, success } = this.state;
    return (
      <>
        <EmailInput
          appear={appear}
          error={error}
          pass={pass}
          success={success}
          handleChangePass={this.handleChangePass}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          handleCheck={this.handleCheck}
        />
      </>
    );
  }
}

ForgotPasswordContainer.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired
};

export default withRouter(ForgotPasswordContainer);
