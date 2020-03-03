import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Container } from "@material-ui/core";

import { getBeerByName, getBrewById } from "../../store/brew/actions";
import { getUser } from "../../store/user/actions";
import {
  likePost,
  dislikePost,
  messageAdd,
  deleteComment
} from "../../dataAccess/brewRepository/helpers";
import BrewPreview from "../../components/BrewFormPage/BrewPreview";
import Loader from "../../components/Loader";
import { addBeer, deleteBeer } from "../../dataAccess/userRepository/helpers";
import CommentSection from "../../components/SingleBrewPage/CommentSection";

class SingleBrewContainer extends React.PureComponent {
  ws = new WebSocket("ws://localhost:1337");

  constructor(props) {
    super(props);
    this.state = {
      message: "",
      error: ""
    };
  }

  componentDidMount() {
    const { id } = this.props;

    const findBrewPost = async aidi => {
      await this.props.getBrewById(aidi);
      const { brew } = this.props;
      await this.props.getBeerByName(brew.brewName);
    };

    const setupWebSocket = () => {
      this.ws = new WebSocket("ws://localhost:1337");
      this.ws.onopen = () => {
        console.log("opened");
      };
      this.ws.onerror = error => {
        console.log(`WebSocket error: ${error}`);
      };
      this.ws.onmessage = evt => {
        const message = JSON.parse(evt.data);
        this.addMessage(message);
      };
      this.ws.onclose = () => {
        console.log("closed");
        setupWebSocket();
      };
    };

    setupWebSocket();

    findBrewPost(id);
  }

  addMessage = async message => {
    const response = await messageAdd(message);
    if (response.data.success === true) {
      this.setState({ message: "", error: "" });
    } else {
      this.setState({ error: response.data.message });
    }
  };

  handleChange = e => {
    const { name } = e.target;
    this.setState({ [name]: e.target.value });
  };

  submitMessage = () => {
    const { message } = this.state;
    const { user, id } = this.props;

    if (message.length < 20) {
      this.setState({ error: "Message need to be at least 20 characters" });
    } else {
      const payload = {
        userId: user.id,
        id,
        name: `${user.firstName} ${user.lastName}`,
        message,
        img: user.profilePicture
      };
      this.setState({ error: "" });
      this.ws.send(JSON.stringify(payload));
    }
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
    const { user, brew } = this.props;
    const payload = { userId: user.id, id: brew._id };
    const response =
      decision === "+" ? await likePost(payload) : await dislikePost(payload);

    console.log(response.data);
  };

  handleDelete = async comment => {
    const { id } = this.props;
    const payload = {
      id,
      userId: comment.userId
    };
    await deleteComment(payload);
  };

  // TODO: создай комментс в редакс сторе!!!!!!!

  render() {
    const { user, brew, beer } = this.props;
    const { error } = this.state;
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
            likes={brew.likes}
            dislikes={brew.dislikes}
            beer={beer}
            handleRating={this.handleRating}
            handleReturn={this.handleReturn}
            handleFavorite={this.handleFavorite}
            userBeerList={user.beerList === undefined ? null : user.beerList}
          />
        </Container>
        <CommentSection
          submitMessage={this.submitMessage}
          handleChange={this.handleChange}
          brew={brew}
          error={error}
          user={user}
          handleDelete={this.handleDelete}
        />
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
