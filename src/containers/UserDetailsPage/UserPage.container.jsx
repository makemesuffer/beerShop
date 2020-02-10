import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import UserInfo from "../../components/UserDetailsPage/UserInfo";
import { getUser } from "../../store/user/actions";
import Loader from "../../components/Loader";
import ErrorBoundary from "../../components/ErrorBoundary";

class UserPageContainer extends React.PureComponent {
  componentDidMount() {
    const { id } = this.props;
    setTimeout(() => {
      this.props.getUser(id);
    }, 3000);
  }

  render() {
    const { user, error } = this.props;
    if (Object.entries(user).length === 0 && error === null) {
      return <Loader />;
    }
    return (
      <>
        {error !== null ? (
          <ErrorBoundary error={error} />
        ) : (
          <UserInfo user={user} />
        )}
      </>
    );
  }
}

UserPageContainer.propTypes = {
  id: PropTypes.string.isRequired,
  getUser: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  error: PropTypes.string
};

UserPageContainer.defaultProps = {
  error: null
};

const mapStateToProps = state => {
  return {
    user: state.user.user,
    error: state.user.error
  };
};

export default connect(mapStateToProps, { getUser })(UserPageContainer);
