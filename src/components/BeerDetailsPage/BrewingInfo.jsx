import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import Ingredients from "./Ingredients";
import Method from "./Method";

const useStyles = makeStyles({
  container: {
    marginTop: "4%",
    marginLeft: 20
  },
  boxContainer: {
    maxWidth: "80%"
  },
  grid: {
    marginTop: "2%",
    display: "grid",
    gridTemplateColumns: "1fr 1.2fr",
    gridColumnGap: 50
  }
});

export default function BrewingInfo(props) {
  const { beer, createListData } = props;
  const classes = useStyles();
  const rows = [
    createListData("Water", `${beer.volume.value} ${beer.volume.unit}`, ""),
    createListData("Malt", beer.ingredients.malt, ""),
    createListData("Hops", beer.ingredients.hops, ""),
    createListData("Yeast", beer.ingredients.yeast, "")
  ];
  const rowa = [
    createListData("Mash", beer.method.mash_temp, ""),
    createListData("Fermentation", beer.method.fermentation, ""),
    createListData("Twist", beer.method.twist, "")
  ];
  return (
    <div className={classes.container}>
      <Box className={classes.boxContainer}>
        <Typography variant="h4">Brewing</Typography>
        <p>{beer.brewers_tips}</p>
        <div className={classes.grid}>
          <Ingredients rows={rows} />
          <Method rows={rowa} />
        </div>
      </Box>
    </div>
  );
}

BrewingInfo.propTypes = {
  beer: PropTypes.shape({
    brewers_tips: PropTypes.string,
    volume: PropTypes.shape({
      value: PropTypes.number,
      unit: PropTypes.string
    }).isRequired,
    ingredients: PropTypes.shape({
      malt: PropTypes.arrayOf(PropTypes.object),
      hops: PropTypes.arrayOf(PropTypes.object),
      yeast: PropTypes.string
    }).isRequired,
    method: PropTypes.shape({
      mash_temp: PropTypes.arrayOf(PropTypes.object),
      fermentation: PropTypes.objectOf(PropTypes.object),
      twist: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.string])
    })
  }).isRequired,
  createListData: PropTypes.func.isRequired
};
