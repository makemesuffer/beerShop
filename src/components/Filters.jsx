import React from "react";
import PropTypes from "prop-types";
// import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Grid from "@material-ui/core/Grid";

// const useStyles = makeStyles(theme => ({}));

// TODO: rebuild styles

export default function Filters(props) {
  const { showFilters } = props;
  // const classes = useStyles();
  if (showFilters === true) {
    return (
      <Grid
        container
        style={{ maxWidth: "600px", margin: "2% auto" }}
        direction="column"
        justify="center"
      >
        <Grid>
          <Typography>Alcohol by volume</Typography>
          <Typography>Значение слайдера</Typography>
          <Slider
            defaultValue={2}
            // getAriaValueText={valuetext}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={0.1}
            min={2}
            max={14}
          />
        </Grid>
        <Grid>
          <Typography>International Bitterness Units</Typography>
          <Typography>Значение слайдера</Typography>
          <Slider
            defaultValue={0}
            // getAriaValueText={valuetext}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={1}
            min={0}
            max={120}
          />
        </Grid>
        <Grid>
          <Typography>Color by EBC</Typography>
          <Typography>Значение слайдера</Typography>
          <Slider
            defaultValue={4}
            // getAriaValueText={valuetext}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={1}
            min={4}
            max={80}
          />
        </Grid>
      </Grid>
    );
  }
  return <> </>;
}

Filters.propTypes = {
  showFilters: PropTypes.bool.isRequired
};
