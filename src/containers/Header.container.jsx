import * as React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import SimpleSnackbar from "../components/Signs/Snackbar";
import { exitUserSession, hideLogout } from "../store/user/actions";
import Header from "../components/Header";

class HeaderContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      anchorEi: null
    };
  }

  componentDidMount() {
    const { user } = this.props;
    if (user !== null) {
      this.setState({ auth: true });
    } else {
      this.setState({ auth: false });
    }
  }

  toggleMenu = event => {
    this.setState({ anchorEi: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEi: null });
  };

  handleExit = () => {
    this.props.exitUserSession();
  };

  handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.props.hideLogout();
  };

  render() {
    const { isLogout, user } = this.props;
    const { anchorEi, auth } = this.state;
    return (
      <>
        <Header
          toggleMenu={this.toggleMenu}
          anchorEi={anchorEi}
          handleClose={this.handleClose}
          auth={auth}
          handleExit={this.handleExit}
          user={user}
        />
        <SimpleSnackbar
          open={isLogout}
          handleCloseSnackbar={this.handleCloseSnackbar}
        />
      </>
    );
  }
}

HeaderContainer.propTypes = {
  user: PropTypes.objectOf(PropTypes.any),
  exitUserSession: PropTypes.func.isRequired,
  isLogout: PropTypes.bool,
  hideLogout: PropTypes.func.isRequired
};

HeaderContainer.defaultProps = {
  user: null,
  isLogout: null
};

const mapStateToProps = state => {
  return {
    user: state.userDetails.model,
    isLogout: state.userDetails.logout
  };
};

export default connect(mapStateToProps, { exitUserSession, hideLogout })(
  HeaderContainer
);
