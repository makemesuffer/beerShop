import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

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
    justifyContent: "stretch",
    gridTemplateColumns: "1fr 1fr",
    gridGap: 50
  },
  gridElem: {
    margin: "0 auto",
    width: "100%"
  },
  inputs: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridGap: 50
  }
}));

export default function BrewList(props) {
  const {
    allowed,
    brewList,
    time,
    beerType,
    handleRating,
    rating,
    error,
    id,
    handleTypeChange,
    handleTimeChange,
    handleFilter
  } = props;
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
      <div className={classes.inputs}>
        <Autocomplete
          options={beerType}
          className={classes.input}
          onChange={handleTypeChange}
          renderInput={params => (
            <TextField
              {...params}
              variant="outlined"
              label="Brew Type"
              fullWidth
              onChange={handleTypeChange}
              name="brewType"
            />
          )}
        />
        <Autocomplete
          options={time}
          className={classes.input}
          onChange={handleTimeChange}
          renderInput={params => (
            <TextField
              {...params}
              variant="outlined"
              label="Time"
              fullWidth
              name="time"
              onChange={handleTimeChange}
            />
          )}
        />
      </div>
      <Button variant="contained" color="primary" onClick={handleFilter}>
        Filter results
      </Button>
      {brewList !== null ? (
        <div className={classes.grid}>
          {brewList.map((elem, index) => {
            return (
              <div key={elem._id} className={classes.gridElem}>
                <BrewSingleCard
                  id={id}
                  brew={elem}
                  handleRating={handleRating}
                  index={index}
                  rating={rating}
                  error={error}
                />
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
  brewList: PropTypes.arrayOf(PropTypes.object),
  beerType: PropTypes.arrayOf(PropTypes.string).isRequired,
  time: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleRating: PropTypes.func.isRequired,
  rating: PropTypes.arrayOf(PropTypes.number).isRequired,
  error: PropTypes.string,
  id: PropTypes.string,
  handleTypeChange: PropTypes.func.isRequired,
  handleTimeChange: PropTypes.func.isRequired,
  handleFilter: PropTypes.func.isRequired
};

BrewList.defaultProps = {
  brewList: null,
  error: null,
  id: null
};
