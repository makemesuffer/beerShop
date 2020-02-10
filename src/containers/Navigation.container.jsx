import * as React from "react";

import Sidebar from "../components/Sidebar";

class NavigationContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false
    };
  }

  handleNavigation = open => {
    this.setState({ showMenu: open });
  };

  render() {
    const { showMenu } = this.state;
    return (
      <Sidebar showMenu={showMenu} handleNavigation={this.handleNavigation} />
    );
  }
}

export default NavigationContainer;
