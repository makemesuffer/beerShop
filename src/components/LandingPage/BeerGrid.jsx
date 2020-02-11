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
  const { beerList, handleFavorite, userBeerList } = props;
  return (
    <Grid container spacing={2} className={classes.container}>
      {beerList.map(elem => {
        return (
          <Grid className={classes.element} key={elem.id} item xs={4}>
            <BeerItem
              beer={elem}
              id={elem.id}
              handleFavorite={handleFavorite}
              userBeerList={userBeerList}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}

BeerGrid.propTypes = {
  beerList: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleFavorite: PropTypes.func.isRequired,
  userBeerList: PropTypes.arrayOf(PropTypes.number)
};

BeerGrid.defaultProps = {
  userBeerList: null
};
