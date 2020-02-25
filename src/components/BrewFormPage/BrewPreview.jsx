import React from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import AddBoxIcon from "@material-ui/icons/AddBox";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import StarIcon from "@material-ui/icons/Star";
import Button from "@material-ui/core/Button";

import beer1 from "./tempAssets/beer1.jpg";
import beer2 from "./tempAssets/beer2.jpeg";
import beer3 from "./tempAssets/beer3.jpeg";
import beer4 from "./tempAssets/beer4.jpeg";
import BrewingInfo from "../BeerDetailsPage/BrewingInfo";

const useStyles = makeStyles(theme => ({
  container: {
    border: "2px solid lightblue",
    display: "flex"
  },
  post: {
    width: "90%",
    margin: "0 auto",
    alignSelf: "center"
  },
  headerButtonsContainer: {
    paddingTop: theme.spacing(2),
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridColumnGap: "25%"
  },
  title: {
    marginTop: theme.spacing(5),
    margin: "0 auto",
    maxWidth: "80%",
    textAlign: "center"
  },
  buttons: {
    width: "60%",
    margin: "0 auto"
  },
  imageGrid: {
    marginTop: theme.spacing(7),
    display: "grid",
    gridTemplateColumns: "170px 170px",
    gridGap: 10,
    justifyContent: "center",
    alignItems: "center"
    /*
    Как сделаешь всю основу - это закончишь
    gridTemplateColumns: "64px 170px 200px 170px 64px",
    gridColumnGap: 15,
     */
  },
  image: {
    height: 150,
    width: 150
  },
  userReview: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    margin: "0 auto",
    overflow: "hidden",
    maxWidth: "80%"
  },
  infoGrid: {
    display: "grid",
    gridTemplateRow: "repeat(2,1fr)"
  },
  beerInfo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "80%",
    marginLeft: "15%"
  },
  footerContainer: {
    marginTop: theme.spacing(7),
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    paddingBottom: theme.spacing(5)
  },
  icons: {
    display: "inline-block",
    verticalAlign: "text-top",
    "&:first-child": {
      marginRight: 3,
      marginLeft: 5
    },
    "&:last-child": {
      marginLeft: 3
    }
  },
  rating: {
    fontSize: 22
  }
}));

const demo = [beer1, beer2, beer3, beer4];

export default function BrewPreview(props) {
  const {
    brewType,
    brewName,
    photos,
    location,
    impressions,
    author,
    time,
    beer,
    createListData
  } = props;
  const classes = useStyles();
  return (
    <Paper className={classes.container}>
      <Paper className={classes.post}>
        <div className={classes.headerButtonsContainer}>
          <Button
            color="primary"
            startIcon={<ArrowBackIcon />}
            className={classes.buttons}
          >
            Go back
          </Button>
          <Button
            color="primary"
            endIcon={<StarIcon />}
            className={classes.buttons}
          >
            Add beer to fav
          </Button>
        </div>
        <Typography component="h4" variant="h4" className={classes.title}>
          {author} opinion on {brewName === "" ? "[Brew Name]" : brewName}
        </Typography>
        <div className={classes.imageGrid}>
          {demo.length < 228 ? (
            <></>
          ) : (
            <Button startIcon={<ArrowBackIcon fontSize="large" />}> </Button>
          )}
          {photos.length === 0
            ? demo.map(elem => {
                return (
                  <Paper key={elem}>
                    <img src={elem} alt="img" className={classes.image} />
                  </Paper>
                );
              })
            : photos.map(photo => {
                return (
                  <Paper key={photo}>
                    <img src={photo} alt="img" className={classes.image} />
                  </Paper>
                );
              })}
          {demo.length < 228 ? (
            <></>
          ) : (
            <Button endIcon={<ArrowForwardIcon fontSize="large" />}> </Button>
          )}
        </div>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className={classes.userReview}
        >
          {impressions === "" ? "[Your beer review]" : impressions}
        </Typography>

        <div className={classes.infoGrid}>
          <Typography component="p" variant="h6">
            Beer was tasted in {location === "" ? "[Location]" : location}
          </Typography>
          <div className={classes.beerInfo}>
            {beer === undefined ? (
              <span>[Beer Description]</span>
            ) : (
              <BrewingInfo beer={beer} createListData={createListData} />
            )}
          </div>
        </div>

        <div className={classes.footerContainer}>
          <Typography component="p" variant="h6" className={classes.rating}>
            Rating 1337
            <IndeterminateCheckBoxIcon className={classes.icons} />
            <AddBoxIcon className={classes.icons} />
          </Typography>

          <Typography component="p" variant="h6" className={classes.rating}>
            {brewType === "" ? "[Type of brew]" : brewType}
          </Typography>

          <Typography component="p" variant="h6" className={classes.rating}>
            {time}
          </Typography>
        </div>
      </Paper>
    </Paper>
  );
}

BrewPreview.propTypes = {
  impressions: PropTypes.string.isRequired,
  brewType: PropTypes.string.isRequired,
  brewName: PropTypes.string.isRequired,
  photos: PropTypes.arrayOf(PropTypes.string).isRequired,
  location: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  beer: PropTypes.objectOf(PropTypes.any),
  createListData: PropTypes.func.isRequired
};

BrewPreview.defaultProps = {
  beer: undefined
};
