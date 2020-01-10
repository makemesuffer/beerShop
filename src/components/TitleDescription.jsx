import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Box } from "@material-ui/core";

const useStyles = makeStyles({
  chet: {}
});

export default function TitleDescription(props) {
  const { beer } = props;
  const classes = useStyles();
  return (
    <>
      <Typography className={classes.chet} variant="h3">
        {beer.name}
      </Typography>
      <Typography>{beer.tagline}</Typography>
      <Button>Add to Favorites</Button>
      <Box>
        <p> {beer.description} </p>
        <img src={beer.image_url} alt="pivasik" />
      </Box>
    </>
  );
}

TitleDescription.propTypes = {
  beer: PropTypes.shape({
    image_url: PropTypes.string,
    name: PropTypes.string,
    tagline: PropTypes.string,
    description: PropTypes.string
  }).isRequired
};
