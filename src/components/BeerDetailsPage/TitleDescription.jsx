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
    gridColumnGap: 30,
    marginBottom: -150
  },
  imageContainer: {
    marginTop: -160
  }
}));

export default function TitleDescription(props) {
  const { beer, userBeerList, handleFavorite } = props;
  const classes = useStyles();
  let haveInFav = false;
  if (userBeerList !== null) {
    haveInFav = userBeerList.includes(beer.id);
  }
  return (
    <div className={classes.container}>
      <Typography variant="h3" className={classes.title}>
        {beer.name}
      </Typography>
      <Typography className={classes.tagline}>{beer.tagline}</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          handleFavorite(beer.id);
        }}
      >
        {haveInFav ? (
          <span>Remove from Favorites</span>
        ) : (
          <span>Add to Favorites</span>
        )}
      </Button>
      <div className={classes.grid}>
        <span className={classes.description}>{beer.description}</span>
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
    description: PropTypes.string,
    id: PropTypes.number
  }).isRequired,
  handleFavorite: PropTypes.func.isRequired,
  userBeerList: PropTypes.arrayOf(PropTypes.number)
};

TitleDescription.defaultProps = {
  userBeerList: null
};
