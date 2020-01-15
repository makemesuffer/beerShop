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
    maxWidth: "70%"
  },
  grid: {
    marginTop: "2%",
    display: "grid",
    gridTemplateColumns: "40% 30%",
    gridColumnGap: "10%"
  }
});

export default function BrewingInfo(props) {
  const { beer, createTableData, createListData } = props;
  const classes = useStyles();
  const rows = [
    createTableData("Water", `${beer.volume.value} ${beer.volume.unit}`, "", 1),
    createTableData("Malt", beer.ingredients.malt, "", 2),
    createTableData("Hops", beer.ingredients.hops, "", 3),
    createTableData("Yeast", beer.ingredients.yeast, "", 4)
  ];
  const rowa = [
    createListData("Mash", beer.method.mash_temp, 1),
    createListData("Fermentation", beer.method.fermentation, 2),
    createListData("Twist", beer.method.twist, 3)
  ];
  return (
    <div className={classes.container}>
      <Box className={classes.boxContainer}>
        <Typography variant="h4">Brewing</Typography>
        <p>{beer.brewers_tips}</p>
      </Box>
      <div className={classes.grid}>
        <Ingredients rows={rows} />
        <Method rows={rowa} />
      </div>
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
  createTableData: PropTypes.func.isRequired,
  createListData: PropTypes.func.isRequired
};
