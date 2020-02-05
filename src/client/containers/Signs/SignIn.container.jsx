import React from "react";

import { loginUser } from "../../dataAccess/userRepository/helpers";
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
    const { login, password } = this.state;
    const payload = { login, password };
    const test = await loginUser(payload);
    console.log(test);
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

export default SignInContainer;
