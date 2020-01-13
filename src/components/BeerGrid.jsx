import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import BeerItem from "./BeerItem";

const useStyles = makeStyles({
  container: {
    maxWidth: "1200px",
    justifyContent: "center",
    margin: "0 auto",
    marginTop: "2%"
  },
  element: {
    textAlign: "center"
  }
});

export default function BeerGrid(props) {
  const classes = useStyles();
  const { beerList, handleAdd, handleRemove, favorites } = props;
  return (
    <Grid container spacing={2} className={classes.container}>
      {beerList.map(elem => {
        return (
          <Grid className={classes.element} key={elem.id} item xs={4}>
            <BeerItem
              beer={elem}
              id={elem.id}
              handleAdd={handleAdd}
              handleRemove={handleRemove}
              favorites={favorites}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}

BeerGrid.propTypes = {
  beerList: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleAdd: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  favorites: PropTypes.arrayOf(PropTypes.number).isRequired
};
