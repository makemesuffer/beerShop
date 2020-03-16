import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Container } from "@material-ui/core";
import socketIoClient from "socket.io-client";

import { deleteMessage, addComment } from "../../store/brew/actions";
import {
  getBrewDetails,
  getRatingChange
} from "../../braveNewStore/brewDetails/actions";
import { updateUser } from "../../braveNewStore/userDetails/actions";
import BrewPreview from "../../components/BrewFormPage/BrewPreview";
import Loader from "../../components/Loader";
import { addBeer, deleteBeer } from "../../dataAccess/userRepository/helpers";
import CommentSection from "../../components/SingleBrewPage/CommentSection";
import getBeerDetails from "../../braveNewStore/beerDetails/actions";

const socket = socketIoClient("http://localhost:1337");

class SingleBrewContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      rating: 0,
      comments: []
    };
  }

  componentDidMount() {
    const { id } = this.props;

    const findBrewPost = async aidi => {
      await this.props.getBrewDetails(aidi);
      const { brew } = this.props;
      this.setState({ rating: brew.rating });
      this.setState({ comments: brew.comments });
      await this.props.getBeerDetails(null, brew.beerName);
    };
    findBrewPost(id);
  }

  addMessage = async message => {
    this.setState({ message: "" });
    await this.props.addComment(message);
  };

  handleChange = e => {
    const { name } = e.target;
    this.setState({ [name]: e.target.value });
  };

  submitMessage = () => {
    const { message } = this.state;
    const { user, id } = this.props;
    const commentId = `f${(+new Date()).toString(16)}`;
    const payload = {
      commentId,
      userId: user.id,
      id,
      name: `${user.firstName} ${user.lastName}`,
      message,
      img: user.profilePicture
    };
    this.addMessage(payload);
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
    if (user !== null) {
      if (user.beerList.includes(id)) {
        await deleteBeer({ id, userId: user.id });
        const updatedFavorites = user.beerList.filter(elem => elem !== id);
        await this.props.updateUser({ beerList: updatedFavorites });
      } else {
        await addBeer({ id, userId: user.id });
        const updatedFavorites = [...user.beerList];
        updatedFavorites.push(id);
        await this.props.updateUser({ beerList: updatedFavorites });
      }
    }
  };

  handleRating = async decision => {
    const { user, brew } = this.props;
    if (user !== null) {
      const payload = { userId: user.id, id: brew._id };
      const response = await this.props.getRatingChange(decision, payload);
      const { rating } = response.value;
      this.setState({ rating });
    }
  };

  handleDelete = async comment => {
    const { brew } = this.props;
    const { id } = this.props;
    const payload = {
      id,
      commentId: comment.commentId
    };
    await this.props.deleteMessage(payload);
    socket.emit("add-message", brew._id);
    socket.on("get_data", singleBrew => {
      this.setState({ comments: singleBrew.comments });
    });
  };

  loadComments = async e => {
    const { id } = this.props;
    e.preventDefault();
    socket.emit("add-message", id);
    socket.on("get_data", singleBrew => {
      this.setState({ comments: singleBrew.comments });
    });
  };

  render() {
    const { user, brew, isBusy, error, beer } = this.props;
    const { message, rating, comments } = this.state;
    if (isBusy || brew === null || beer === null) {
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
            rating={rating}
            error={error}
            beer={beer}
            handleRating={this.handleRating}
            handleReturn={this.handleReturn}
            handleFavorite={this.handleFavorite}
            userBeerList={user === null ? null : user.beerList}
          />
        </Container>
        <CommentSection
          loadComments={this.loadComments}
          submitMessage={this.submitMessage}
          handleChange={this.handleChange}
          brew={brew}
          user={user}
          handleDelete={this.handleDelete}
          allowed={user !== null}
          message={message}
          comments={comments}
        />
      </>
    );
  }
}

SingleBrewContainer.propTypes = {
  brew: PropTypes.objectOf(PropTypes.any),
  isBusy: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  getBrewDetails: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  user: PropTypes.objectOf(PropTypes.any),
  deleteMessage: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  getRatingChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  updateUser: PropTypes.func.isRequired,
  beer: PropTypes.objectOf(PropTypes.any).isRequired,
  getBeerDetails: PropTypes.func.isRequired
};

SingleBrewContainer.defaultProps = {
  brew: null,
  user: null,
  error: null
};

const mapStateToProps = state => {
  return {
    brew: state.brewDetails.model,
    user: state.userDetails.model,
    error: state.brewList.error,
    isBusy: state.brewDetails.isBusy,
    beer: state.beerDetails.model
  };
};

export default connect(mapStateToProps, {
  getBrewDetails,
  deleteMessage,
  addComment,
  getRatingChange,
  updateUser,
  getBeerDetails
})(withRouter(SingleBrewContainer));
