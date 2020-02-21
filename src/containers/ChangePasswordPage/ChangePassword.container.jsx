import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getUser, exitUserSession } from "../../store/user/actions";
import { changePassword } from "../../dataAccess/userRepository/helpers";
import ChangePassword from "../../components/ChangePasswordPage/ChangePassword";

class ChangePasswordContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: "",
      newPassword: "",
      repeatPassword: "",
      error: "",
      success: ""
    };
  }

  componentDidMount() {
    const { id } = this.props;
    const waitUser = async () => {
      await this.props.getUser(id);
    };
    waitUser();
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
    const result = await changePassword(payload);
    if (result.data.success === true) {
      this.setState({ success: result.data.message });
      setTimeout(() => {
        this.props.exitUserSession();
        history.replace("/login");
      }, 3000);
    } else {
      this.setState({ error: result.data.error });
    }
  };

  render() {
    const { error, success } = this.state;
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
  getUser: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  exitUserSession: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.user.user
  };
};

export default connect(mapStateToProps, {
  getUser,
  exitUserSession
})(withRouter(ChangePasswordContainer));
