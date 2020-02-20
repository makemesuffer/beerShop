import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({});

export default function BrewPreview() {
  const classes = useStyles();
  return (
    <Paper>
      <Typography component="h3" variant="h3" className={classes.container}>
        Tut brew Previeha
      </Typography>
    </Paper>
  );
}

/*
 container: {
    border: "3px solid black"
  }
  ЗАМЕНИ НА БОЛЕЕ ПРИЯТНЫЙ ЦВЕТ
 */
