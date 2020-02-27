import React from "react";
// import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
// import InputAdornment from "@material-ui/core/InputAdornment";

const useStyles = makeStyles(theme => ({
  margin: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4)
  }
}));

export default function AddComment() {
  const classes = useStyles();
  return (
    <FormControl fullWidth className={classes.margin} variant="outlined">
      <InputLabel htmlFor="outlined-adornment-amount">Comment</InputLabel>
      <OutlinedInput labelWidth={60} />
    </FormControl>
  );
}
