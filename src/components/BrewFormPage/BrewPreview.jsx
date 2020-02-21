import React from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import StarIcon from "@material-ui/icons/Star";
import Button from "@material-ui/core/Button";

import beer1 from "./tempAssets/beer1.jpg";
import beer2 from "./tempAssets/beer2.jpeg";
import beer3 from "./tempAssets/beer3.jpeg";

const useStyles = makeStyles(theme => ({
  container: {
    border: "2px solid lightblue"
  },
  post: {
    marginTop: theme.spacing(5),
    width: "90%",
    margin: "0 auto"
  },
  headerButtonsContainer: {
    paddingTop: theme.spacing(2),
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridColumnGap: "25%"
  },
  title: {
    marginTop: theme.spacing(5)
  },
  buttons: {
    width: "60%",
    margin: "0 auto"
  },
  imageGrid: {
    marginTop: theme.spacing(7),
    display: "grid",
    gridTemplateColumns: "64px 170px 200px 170px 64px",
    gridColumnGap: 15,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    height: 150,
    width: 150
  },
  userReview: {
    margin: theme.spacing(5)
  },
  infoGrid: {
    display: "grid",
    gridTemplateRow: "repeat(3,1fr)"
  },
  location: {
    textAlign: "left",
    marginLeft: 25
  },
  beerInfo: {
    margin: `5% auto`,
    width: "90%"
  },
  author: {
    textAlign: "right",
    marginRight: 25
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
      marginRight: -3,
      marginLeft: 5
    },
    "&:last-child": {
      marginLeft: -3
    }
  },
  rating: {
    fontSize: 22
  }
}));

const demo = [beer1, beer2, beer3];

export default function BrewPreview(props) {
  const { brewType, brewName, photos, location, impressions } = props;
  console.log(photos);
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
            Add favorite
          </Button>
        </div>
        <Typography component="h4" variant="h4" className={classes.title}>
          {brewName} author opinion
        </Typography>
        <div className={classes.imageGrid}>
          {demo.length < 4 ? (
            <p />
          ) : (
            <Button startIcon={<ArrowBackIcon fontSize="large" />}> </Button>
          )}
          {demo.map(elem => {
            return (
              <Paper key={elem}>
                <img src={elem} alt="img" className={classes.image} />
              </Paper>
            );
          })}
          {demo.length < 4 ? (
            <p />
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
          {impressions}
        </Typography>

        <div className={classes.infoGrid}>
          <Typography component="p" variant="h6" className={classes.location}>
            Beer was tasted in {location}
          </Typography>

          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.beerInfo}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Mauris
            rhoncus aenean vel elit scelerisque. Interdum varius sit amet mattis
            vulputate enim nulla aliquet porttitor. Consequat semper viverra nam
            libero justo laoreet sit amet cursus. Eget arcu dictum varius duis
            at consectetur lorem donec massa. Egestas congue quisque egestas
            diam. A pellentesque sit amet porttitor eget dolor morbi. Egestas
            fringilla phasellus faucibus scelerisque eleifend donec pretium
            vulputate sapien. Odio pellentesque diam volutpat commodo sed
            egestas. Curabitur vitae nunc sed velit dignissim sodales ut eu.
            Nunc id cursus metus aliquam eleifend mi in. Cum sociis natoque
            penatibus et magnis dis parturient montes nascetur. Nisi est sit
            amet facilisis magna. Mi eget mauris pharetra et ultrices neque
            ornare. Hac habitasse platea dictumst quisque sagittis purus. Sed
            velit dignissim sodales ut eu.
          </Typography>

          <Typography component="p" variant="h6" className={classes.author}>
            Author name
          </Typography>
        </div>

        <div className={classes.footerContainer}>
          <Typography component="p" variant="h6" className={classes.rating}>
            Rating
            <KeyboardArrowDownIcon className={classes.icons} />
            1337
            <KeyboardArrowUpIcon className={classes.icons} />
          </Typography>

          <Typography component="p" variant="h6" className={classes.rating}>
            {brewType} review
          </Typography>

          <Typography component="p" variant="h6" className={classes.rating}>
            22:05:36
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
  location: PropTypes.string.isRequired
};
