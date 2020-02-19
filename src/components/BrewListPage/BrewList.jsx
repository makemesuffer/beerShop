import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  container: {
    textAlign: "center"
  }
});

export default function BrewList(props) {
  const { allowed, brewList } = props;

  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xl" className={classes.container}>
      {allowed ? (
        <>
          <Button variant="contained" color="primary" href="/brews/add">
            {" "}
            Add a new brew{" "}
          </Button>
        </>
      ) : (
        <></>
      )}
      {brewList !== null ? (
        <Paper>
          {brewList.map(elem => {
            return elem.name;
          })}
        </Paper>
      ) : (
        <p> No brews registered</p>
      )}
    </Container>
  );
}

BrewList.propTypes = {
  allowed: PropTypes.bool.isRequired,
  brewList: PropTypes.arrayOf(PropTypes.object)
};

BrewList.defaultProps = {
  brewList: null
};
