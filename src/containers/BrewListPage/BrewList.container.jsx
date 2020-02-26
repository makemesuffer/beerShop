import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import BrewList from "../../components/BrewListPage/BrewList";
import { getUser } from "../../store/user/actions";
import { getBrewList } from "../../store/brew/actions";

class BrewListContainer extends React.PureComponent {
  componentDidMount() {
    const { user } = this.props;
    const waitUser = async () => {
      await this.props.getUser(user.id);
    };
    waitUser();
    const waitBrewList = async () => {
      await this.props.getBrewList();
    };
    waitBrewList();
  }

  render() {
    const { allowed, brewList } = this.props;
    return (
      <>
        <BrewList allowed={allowed} brewList={brewList} />
      </>
    );
  }
}

BrewListContainer.propTypes = {
  allowed: PropTypes.bool.isRequired,
  brewList: PropTypes.arrayOf(PropTypes.object),
  user: PropTypes.objectOf(PropTypes.any),
  getUser: PropTypes.func.isRequired,
  getBrewList: PropTypes.func.isRequired
};

BrewListContainer.defaultProps = {
  brewList: null,
  user: null
};

const mapStateToProps = state => {
  return {
    allowed: state.user.allowed,
    user: state.user.user,
    brewList: state.brew.brewList
  };
};

export default connect(mapStateToProps, { getUser, getBrewList })(
  BrewListContainer
);
