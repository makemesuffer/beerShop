import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import BrewSingleCard from "./BrewSingleCard";

const useStyles = makeStyles(theme => ({
  container: {
    textAlign: "center"
  },
  grid: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    display: "grid",
    alignItems: "stretch",
    gridTemplateColumns: "1fr 1fr",
    gridGap: 50
  },
  gridElem: {
    margin: "0 auto"
  }
}));

export default function BrewList(props) {
  const { allowed, brewList } = props;

  const classes = useStyles();
  return (
    <Container component="main" maxWidth="lg" className={classes.container}>
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
        <div className={classes.grid}>
          {brewList.map(elem => {
            return (
              <div key={elem.id} className={classes.gridElem}>
                <BrewSingleCard brew={elem} />
              </div>
            );
          })}
        </div>
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
