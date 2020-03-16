import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  logoutUser,
  changeUserPassword
} from "../../braveNewStore/userDetails/actions";
import ChangePassword from "../../components/ChangePasswordPage/ChangePassword";

class ChangePasswordContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: "",
      newPassword: "",
      repeatPassword: "",
      success: ""
    };
  }

  handleChange = e => {
    const { name } = e.target;
    this.setState({ [name]: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { id, history } = this.props;
    const { oldPassword, newPassword, repeatPassword } = this.state;
    const payload = { id, oldPassword, newPassword, repeatPassword };
    const result = await this.props.changeUserPassword(payload);
    if (result.data.success === true) {
      this.setState({ success: result.data.message });
      setTimeout(async () => {
        await this.props.logoutUser();
        history.replace("/login");
      }, 3000);
    }
  };

  render() {
    const { success } = this.state;
    const { error } = this.props;
    console.log(error);
    return (
      <>
        <ChangePassword
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          error={error}
          success={success}
        />
      </>
    );
  }
}

ChangePasswordContainer.propTypes = {
  id: PropTypes.string.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  logoutUser: PropTypes.func.isRequired,
  error: PropTypes.string,
  changeUserPassword: PropTypes.func.isRequired
};

ChangePasswordContainer.defaultProps = {
  error: null
};

const mapStateToProps = state => {
  return {
    user: state.userDetails.model,
    error: state.userDetails.error
  };
};

export default connect(mapStateToProps, { logoutUser, changeUserPassword })(
  withRouter(ChangePasswordContainer)
);
