import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import AddComment from "./AddComment";
import Comments from "./Comments";

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  }
}));

export default function CommentSection(props) {
  const {
    submitMessage,
    handleChange,
    handleDelete,
    user,
    allowed,
    message,
    comments,
    loadComments
  } = props;
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      {allowed ? (
        <AddComment
          submitMessage={submitMessage}
          handleChange={handleChange}
          message={message}
          loadComments={loadComments}
        />
      ) : (
        <></>
      )}
      <Comments user={user} handleDelete={handleDelete} comments={comments} />
    </Container>
  );
}

CommentSection.propTypes = {
  submitMessage: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.any),
  handleDelete: PropTypes.func.isRequired,
  allowed: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  loadComments: PropTypes.func.isRequired,
  comments: PropTypes.arrayOf(PropTypes.string).isRequired
};

CommentSection.defaultProps = {
  user: null
};
