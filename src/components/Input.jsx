import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { GoSearch } from "react-icons/all";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 600
    }
  },
  search: {
    color: "gray",
    height: "25px",
    width: "25px",
    paddingBottom: "10px"
  }
}));

export default function Input(props) {
  const { handleClick } = props;
  const classes = useStyles();
  return (
    <Grid container direction="row" justify="center" alignItems="flex-end">
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleClick}
      >
        <TextField id="standard-basic" label="Search beers..." />
      </form>
      <GoSearch className={classes.search} onClick={handleClick} />
    </Grid>
  );
}

Input.propTypes = {
  handleClick: PropTypes.func.isRequired
};
