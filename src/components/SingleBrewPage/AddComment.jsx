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
  button: {
    width: "20%",
    alignSelf: "end"
  }
});

export default function AddComment(props) {
  const { submitMessage, handleChange, message } = props;
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
        <Button onClick={submitMessage} className={classes.button}>
          Submit message
        </Button>
      </FormControl>
    </>
  );
}

AddComment.propTypes = {
  submitMessage: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired
};
