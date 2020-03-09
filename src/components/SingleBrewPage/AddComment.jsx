import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles({
  input: {
    width: "70%",
    display: "flex",
    flexDirection: "column"
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between"
  },
  button: {
    width: "30%"
  }
});

export default function AddComment(props) {
  const { submitMessage, handleChange, message, loadComments } = props;
  const classes = useStyles();
  return (
    <>
      <FormControl className={classes.input} variant="outlined">
        <TextField
          variant="outlined"
          margin="normal"
          name="message"
          onChange={handleChange}
          label="Comment"
          value={message}
        />
        <div className={classes.buttons}>
          <Button onClick={submitMessage} className={classes.button}>
            Submit message
          </Button>
          <Button onClick={loadComments} className={classes.button}>
            Load new comments
          </Button>
        </div>
      </FormControl>
    </>
  );
}

AddComment.propTypes = {
  submitMessage: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  loadComments: PropTypes.func.isRequired
};
