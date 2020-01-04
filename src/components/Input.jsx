import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { GoSearch } from "react-icons/all";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 600
    }
  },
  grid: {}, // TODO: rewrite brat
  search: {
    color: "gray",
    height: "25px",
    width: "25px",
    paddingBottom: "10px"
  }
}));

export default function Input() {
  const classes = useStyles();
  return (
    <Grid
      container
      className={classes.grid}
      direction="row"
      justify="center"
      alignItems="flex-end"
    >
      <form className={classes.root} noValidate autoComplete="off">
        <TextField id="standard-basic" label="Search beers..." />
      </form>
      <GoSearch className={classes.search} />
    </Grid>
  );
}
