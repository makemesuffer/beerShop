import React from "react";
// import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    marginTop: "4%",
    marginLeft: 20
  }
});

export default function UserInfo() {
  const classes = useStyles();

  return (
    <div>
      <p className={classes.container}> Privet </p>
      <p> Poka </p>
    </div>
  );
}
