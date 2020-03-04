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
    brew,
    allowed,
    message
  } = props;
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      {allowed ? (
        <AddComment
          submitMessage={submitMessage}
          handleChange={handleChange}
          message={message}
        />
      ) : (
        <></>
      )}
      <Comments user={user} brew={brew} handleDelete={handleDelete} />
    </Container>
  );
}

CommentSection.propTypes = {
  submitMessage: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.any),
  handleDelete: PropTypes.func.isRequired,
  brew: PropTypes.objectOf(PropTypes.any).isRequired,
  allowed: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired
};

CommentSection.defaultProps = {
  user: null
};
