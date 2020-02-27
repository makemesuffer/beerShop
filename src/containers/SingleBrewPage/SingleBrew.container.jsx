import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Container } from "@material-ui/core";
import { getBeerByName, getBrewById } from "../../store/brew/actions";
import { getUser } from "../../store/user/actions";
import { ratingChange } from "../../dataAccess/brewRepository/helpers";
import BrewPreview from "../../components/BrewFormPage/BrewPreview";
import Loader from "../../components/Loader";
import { addBeer, deleteBeer } from "../../dataAccess/userRepository/helpers";
import AddComment from "../../components/SingleBrewPage/AddComment";

class SingleBrewContainer extends React.PureComponent {
  ws = new WebSocket("ws://localhost:1337");

  componentDidMount() {
    const { id } = this.props;
    const findBrewPost = async aidi => {
      await this.props.getBrewById(aidi);
      const { brew } = this.props;
      await this.props.getBeerByName(brew.brewName);
    };

    this.ws.onopen = () => {
      console.log("connected");
    };
    this.ws.onmessage = evt => {
      console.log(evt.data);
      const message = JSON.parse(evt.data);
      this.addMessage(message);
    };
    findBrewPost(id);
  }

  addMessage = message => {
    const user = this.props;
    const payload = { id: user.id, message };
    console.log(payload);
    // messageAdd(payload); - post zapros na servak
  };

  submitMessage = messageString => {
    const { user } = this.props;
    const message = {
      name: `${user.firstName} ${user.lastName}`,
      message: messageString
    };
    this.ws.send(JSON.stringify(message));
    this.addMessage(message);
  };

  handleReturn = () => {
    const { history } = this.props;
    history.goBack();
  };

  createListData = (name, value, description) => {
    if (name !== "Yeast" && name !== "Water") {
      if (value === null) value = "NO INFO";
      else {
        value =
          value instanceof Array || value instanceof String ? value : [value];
      }
    }
    return { name, value, description };
  };

  handleFavorite = async id => {
    const { user } = this.props;
    if (Object.entries(user).length !== 0) {
      if (user.beerList.includes(id)) {
        await deleteBeer({ id, userId: user.id });
        await this.props.getUser(user.id);
      } else {
        await addBeer({ id, userId: user.id });
        await this.props.getUser(user.id);
      }
    }
  };

  handleRating = async decision => {
    const { brew } = this.props;

    if (decision === "+") {
      const payload = { id: brew._id, change: 1 };
      await ratingChange(payload);
    } else {
      const payload = { id: brew._id, change: -1 };
      await ratingChange(payload);
    }
  };

  render() {
    const { user, brew, beer } = this.props;
    if (brew === null || beer === null) {
      return <Loader />;
    }
    return (
      <>
        <Container maxWidth="md">
          <BrewPreview
            brewType={brew.brewType}
            createListData={this.createListData}
            location={brew.location}
            author={brew.author.firstName}
            brewName={brew.brewName}
            photos={brew.images}
            impressions={brew.impressions}
            createdAt={brew.createdAt}
            rating={brew.rating}
            beer={beer}
            handleRating={this.handleRating}
            handleReturn={this.handleReturn}
            handleFavorite={this.handleFavorite}
            userBeerList={user.beerList === undefined ? null : user.beerList}
          />
        </Container>
        <Container maxWidth="lg">
          <AddComment />
        </Container>
      </>
    );
  }
}

SingleBrewContainer.propTypes = {
  brew: PropTypes.objectOf(PropTypes.any),
  id: PropTypes.string.isRequired,
  getBrewById: PropTypes.func.isRequired,
  beer: PropTypes.objectOf(PropTypes.any),
  getBeerByName: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  user: PropTypes.objectOf(PropTypes.any),
  getUser: PropTypes.func.isRequired
};

SingleBrewContainer.defaultProps = {
  brew: null,
  beer: null,
  user: null
};

const mapStateToProps = state => {
  return {
    brew: state.brew.singleBrew,
    beer: state.brew.singleBeer[0],
    user: state.user.user
  };
};

export default connect(mapStateToProps, {
  getBrewById,
  getBeerByName,
  getUser
})(withRouter(SingleBrewContainer));
