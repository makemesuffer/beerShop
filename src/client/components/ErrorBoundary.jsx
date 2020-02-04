import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  container: {
    textAlign: "center",
    marginTop: "20%"
  },
  text: {
    color: theme.palette.danger.main
  }
}));

export default function ErrorBoundary(props) {
  const { error } = props;
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Typography className={classes.text} variant="h4">
        {error}
      </Typography>
    </div>
  );
}

ErrorBoundary.propTypes = {
  error: PropTypes.string.isRequired
};
