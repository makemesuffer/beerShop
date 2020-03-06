import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Container } from "@material-ui/core";
import socketIoClient from "socket.io-client";

import { saveUserProgress } from "../../store/user/actions";
import {
  getBeerByName,
  getBrewById,
  deleteMessage,
  addComment,
  getRatingChange
} from "../../store/brew/actions";
import BrewPreview from "../../components/BrewFormPage/BrewPreview";
import Loader from "../../components/Loader";
import { addBeer, deleteBeer } from "../../dataAccess/userRepository/helpers";
import CommentSection from "../../components/SingleBrewPage/CommentSection";

const socket = socketIoClient("http://localhost:1337");

class SingleBrewContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      rating: 0
    };
  }

  componentDidMount() {
    const { id } = this.props;

    const findBrewPost = async aidi => {
      await this.props.getBrewById(aidi);
      const { brew } = this.props;
      this.setState({ rating: brew.likes - brew.dislikes });
      await this.props.getBeerByName(brew.brewName);
    };
    findBrewPost(id);
  }

  addMessage = async message => {
    this.setState({ message: "" });
    await this.props.addComment(message);
    socket.on("message", message);
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
    const { user, rememberMe } = this.props;
    if (user !== null) {
      if (user.beerList.includes(id)) {
        await deleteBeer({ id, userId: user.id });
        await this.props.saveUserProgress(user, rememberMe);
      } else {
        await addBeer({ id, userId: user.id });
        await this.props.saveUserProgress(user, rememberMe);
      }
    }
  };

  handleRating = async decision => {
    const { user, brew } = this.props;
    if (user !== null) {
      const payload = { userId: user.id, id: brew._id };
      await this.props.getRatingChange(decision, payload);
      const { rating } = this.props;
      this.setState({ rating });
    }
  };

  handleDelete = async comment => {
    const { id } = this.props;
    const payload = {
      id,
      commentId: comment.commentId
    };
    this.props.deleteMessage(payload);
  };

  render() {
    const { user, brew, beer, allowed, error } = this.props;
    const { message, rating } = this.state;
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
          submitMessage={this.submitMessage}
          handleChange={this.handleChange}
          brew={brew}
          user={user}
          handleDelete={this.handleDelete}
          allowed={allowed}
          message={message}
        />
      </>
    );
  }
}

SingleBrewContainer.propTypes = {
  brew: PropTypes.objectOf(PropTypes.any),
  allowed: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  getBrewById: PropTypes.func.isRequired,
  beer: PropTypes.objectOf(PropTypes.any),
  getBeerByName: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  user: PropTypes.objectOf(PropTypes.any),
  deleteMessage: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  getRatingChange: PropTypes.func.isRequired,
  rating: PropTypes.number.isRequired,
  error: PropTypes.string,
  saveUserProgress: PropTypes.func.isRequired,
  rememberMe: PropTypes.bool.isRequired
};

SingleBrewContainer.defaultProps = {
  brew: null,
  beer: null,
  user: null,
  error: null
};

const mapStateToProps = state => {
  return {
    allowed: state.user.allowed,
    brew: state.brew.singleBrew,
    beer: state.brew.singleBeer,
    user: state.user.user,
    rating: state.brew.rating,
    error: state.brew.error,
    rememberMe: state.user.rememberMe
  };
};

export default connect(mapStateToProps, {
  getBrewById,
  getBeerByName,
  deleteMessage,
  addComment,
  getRatingChange,
  saveUserProgress
})(withRouter(SingleBrewContainer));