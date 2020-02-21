import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";

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
          <Link color="inherit" component={RouterLink} to="/brews/add">
            <Button variant="contained" color="primary">
              Add a new brew
            </Button>
          </Link>
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
