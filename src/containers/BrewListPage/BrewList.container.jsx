import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import BrewList from "../../components/BrewListPage/BrewList";
import {
  getBrewList,
  getRatingChange,
  getFilteredBrews
} from "../../braveNewStore/brewList/actions";
import Loader from "../../components/Loader";

class BrewListContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      time: ["Day", "Week", "Month", "Year", "All"],
      beerType: [
        "All",
        "Ale",
        "Lager",
        "Stout",
        "Porter",
        "Lambic",
        "Pilsner",
        "Pale Ale",
        "Weissbier",
        "Belgian Ale"
      ],
      brewType: "All",
      whatTime: "All",
      rating: []
    };
  }

  componentDidMount() {
    const waitBrewList = async () => {
      await this.props.getBrewList();
      const { brewList } = this.props;
      const count = brewList.map(brew => {
        return brew.rating;
      });
      this.setState({ rating: count });
    };
    waitBrewList();
  }

  handleTypeChange = (e, values) => {
    if (values === null) {
      this.setState({ brewType: "All" });
    }
    if (values !== undefined && values !== null) {
      this.setState({ brewType: values });
    }
  };

  handleTimeChange = (e, values) => {
    if (values !== undefined && values !== null) {
      this.setState({ whatTime: values });
    }
  };

  handleFilter = async () => {
    const { brewType, whatTime } = this.state;
    await this.props.getFilteredBrews({ brewType }, whatTime);
    const { brewList: newBrewList } = this.props;
    const count = newBrewList.map(brew => {
      return brew.rating;
    });
    this.setState({ rating: count });
  };

  handleRating = async (decision, index) => {
    const { user, brewList } = this.props;
    const { rating: rate } = this.state;
    if (user !== null) {
      const payload = { userId: user.id, id: brewList[index]._id };
      const copy = [...rate];
      const response = await this.props.getRatingChange(decision, payload);
      const { rating } = response.value[index];
      copy[index] = rating;
      this.setState({ rating: copy });
    }
  };

  render() {
    const { brewList, error, user, isBusy } = this.props;
    const { time, beerType, rating, brewType, whatTime } = this.state;
    if (isBusy === true) return <Loader />;
    return (
      <>
        <BrewList
          error={error}
          allowed={user !== null}
          rating={rating}
          brewList={brewList}
          time={time}
          beerType={beerType}
          handleRating={this.handleRating}
          handleTypeChange={this.handleTypeChange}
          handleTimeChange={this.handleTimeChange}
          handleFilter={this.handleFilter}
          whatTime={whatTime}
          brewType={brewType}
        />
      </>
    );
  }
}

BrewListContainer.propTypes = {
  error: PropTypes.string,
  brewList: PropTypes.arrayOf(PropTypes.object),
  user: PropTypes.objectOf(PropTypes.any),
  getBrewList: PropTypes.func.isRequired,
  getRatingChange: PropTypes.func.isRequired,
  getFilteredBrews: PropTypes.func.isRequired,
  isBusy: PropTypes.bool.isRequired
};

BrewListContainer.defaultProps = {
  brewList: null,
  user: null,
  error: null
};

const mapStateToProps = state => {
  return {
    user: state.userDetails.model,
    brewList: state.brewList.items,
    error: state.brewList.error,
    isBusy: state.brewList.isBusy
  };
};

export default connect(mapStateToProps, {
  getBrewList,
  getRatingChange,
  getFilteredBrews
})(BrewListContainer);
