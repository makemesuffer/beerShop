import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles({
  container: {
    textAlign: "center"
  },
  circle: {
    marginTop: "20%"
  }
});

export default function Loader() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <CircularProgress className={classes.circle} />
    </div>
  );
}
