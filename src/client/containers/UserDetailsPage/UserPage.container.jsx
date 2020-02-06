import React from "react";
import PropTypes from "prop-types";
import UserInfo from "../../components/UserDetailsPage/UserInfo";

class UserPageContainer extends React.PureComponent {
  componentDidMount() {
    // const { id } = this.props;
    setTimeout(() => {
      // this.props.getBeerDetailsPending(false); -- pendind sideUserDetails
      // this.props.getBeerDetails(id); -- get sideUserDetails(id)
    }, 3000);
  }

  render() {
    const { id } = this.props;
    console.log(id);
    return (
      <>
        <UserInfo />
      </>
    );
  }
}

UserPageContainer.propTypes = {
  id: PropTypes.string.isRequired
};

export default UserPageContainer;
