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
    error,
    comments,
    userId,
    handleDelete
  } = props;
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <AddComment
        submitMessage={submitMessage}
        handleChange={handleChange}
        error={error}
      />
      <Comments
        comments={comments}
        userId={userId}
        handleDelete={handleDelete}
      />
    </Container>
  );
}

CommentSection.propTypes = {
  submitMessage: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  userId: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired
};
