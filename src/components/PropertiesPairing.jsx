import React from "react";
import PropTypes from "prop-types";
// import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

/*
const useStyles = makeStyles({
  chet: {}
});

 */

// TODO: список ты видел у материала юзни его тут

export default function PropertiesPairing(props) {
  const { beer } = props;
  // const classes = useStyles();
  return (
    <>
      <Typography variant="h4">Properties</Typography>
      <tablica>
        <row>
          <span> ABV </span>
          <fidjet />
          <span>{beer.abv}</span>
        </row>
        <row>
          <span> IBU </span>
          <fidjet />
          <span>{beer.ibu}</span>
        </row>
        <row>
          <span> EBC </span>
          <fidjet />
          <span>{beer.ebc}</span>
        </row>
      </tablica>
      <tablica>
        {beer.food_pairing.map((elem, index) => {
          return <div id={index}> {elem} </div>;
        })}
      </tablica>
    </>
  );
}

PropertiesPairing.propTypes = {
  beer: PropTypes.shape({
    abv: PropTypes.number,
    ibu: PropTypes.number,
    ebc: PropTypes.number,
    food_pairing: PropTypes.arrayOf(PropTypes.string)
  }).isRequired
};
