import React from "react";

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
      password: ""
    };
  }

  handleChange = e => {
    const { name } = e.target;
    this.setState({ [name]: e.target.value });
  };

  addUser = async () => {
    const { firstName, lastName, login, birthDate, password } = this.state;
    const payload = { login, password, firstName, lastName, birthDate };
    await createUser(payload);
  };

  render() {
    return (
      <>
        <SignUpForm addUser={this.addUser} handleChange={this.handleChange} />
      </>
    );
  }
}

export default SignUpContainer;
