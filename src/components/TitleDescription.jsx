import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  container: {
    marginLeft: 20
  },
  title: {
    marginLeft: 5
  },
  tagline: {
    marginLeft: 5,
    marginTop: -5,
    marginBottom: 10,
    fontStyle: "italic",
    color: theme.palette.secondary.main
  },
  image: {
    width: 125,
    height: 400,
    alignSelf: "end"
  },
  grid: {
    marginTop: 20,
    display: "grid",
    gridTemplateColumns: "3.5fr 1fr",
    gridColumnGap: 30
  },
  imageContainer: {
    marginTop: -160
  }
}));

export default function TitleDescription(props) {
  const { beer } = props;
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Typography variant="h3" className={classes.title}>
        {beer.name}
      </Typography>
      <Typography className={classes.tagline}>{beer.tagline}</Typography>
      <Button variant="contained" color="primary">
        Add to Favorites
      </Button>
      <div className={classes.grid}>
        {beer.description}
        <div className={classes.imageContainer}>
          <img src={beer.image_url} alt="pivasik" className={classes.image} />
        </div>
      </div>
    </div>
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

//
