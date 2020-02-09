import React from "react";
import { withRouter } from "react-router-dom";

import PropTypes from "prop-types";
import { createUser } from "../../dataAccess/userRepository/helpers";
import SignUpForm from "../../components/Signs/SignUpForm";

class SignUpContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      login: "",
      birthDate: "",
      password: "",
      error: ""
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
    const result = await createUser(payload);
    console.log(result);
    if (result.data.success === true) {
      history.push("/search");
    } else {
      this.setState({ error: test.data.error });
    }
  };

  render() {
    const { error } = this.state;
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
  history: PropTypes.objectOf(PropTypes.any).isRequired
};

export default withRouter(SignUpContainer);
