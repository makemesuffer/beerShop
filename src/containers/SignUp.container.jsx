import * as React from "react";

import Header from "../components/Header";

class SignUpContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      anchorEi: null
    };
  }

  toggleMenu = event => {
    this.setState({ anchorEi: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEi: null });
  };

  render() {
    const { anchorEi, auth } = this.state;
    return (
      <Header
        toggleMenu={this.toggleMenu}
        anchorEi={anchorEi}
        handleClose={this.handleClose}
        auth={auth}
      />
    );
  }
}

export default SignUpContainer;
