import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Box from "@material-ui/core/Box";
import debounce from "lodash/debounce";

const useStyles = makeStyles(() => ({
  container: {
    maxWidth: 700,
    margin: "1% auto"
  },
  title: {
    fontWeight: 700,
    fontSize: 16,
    textAlign: "center"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    marginTop: 40
  },
  gridItem: {
    justifySelf: "end",
    marginRight: 20,
    fontWeight: "bold",
    fontSize: 20
  }
}));

export default function Filters(props) {
  const classes = useStyles();
  const {
    showFilters,
    alcoholValue,
    bitternessValue,
    colorValue,
    handleSliderChange
  } = props;
  if (showFilters === true) {
    return (
      <Box className={classes.container}>
        <Typography className={classes.title}> Filter Results </Typography>
        <div className={classes.grid}>
          <Typography>Alcohol by volume</Typography>
          <Typography className={classes.gridItem}>{alcoholValue}</Typography>
          <Slider
            defaultValue={2}
            title="alcoholValue"
            value={alcoholValue}
            onChange={handleSliderChange}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={0.1}
            min={2}
            max={14}
          />
        </div>
        <div className={classes.grid}>
          <Typography>International Bitterness Units</Typography>
          <Typography className={classes.gridItem}>
            {bitternessValue}
          </Typography>
          <Slider
            defaultValue={0}
            title="bitternessValue"
            value={bitternessValue}
            onChange={handleSliderChange}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={1}
            min={0}
            max={120}
          />
        </div>
        <div className={classes.grid}>
          <Typography>Color by EBC</Typography>
          <Typography className={classes.gridItem}>{colorValue}</Typography>
          <Slider
            defaultValue={4}
            title="colorValue"
            value={colorValue}
            onChange={debounce(handleSliderChange, 1000)}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={1}
            min={4}
            max={80}
          />
        </div>
      </Box>
    );
  }
  return <> </>;
}

Filters.propTypes = {
  showFilters: PropTypes.bool.isRequired,
  alcoholValue: PropTypes.number.isRequired,
  bitternessValue: PropTypes.number.isRequired,
  colorValue: PropTypes.number.isRequired,
  handleSliderChange: PropTypes.func.isRequired
};
