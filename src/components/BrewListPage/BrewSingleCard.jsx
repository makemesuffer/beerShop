import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import AddBoxIcon from "@material-ui/icons/AddBox";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 700,
    height: 370,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  media: {
    maxHeight: 180,
    maxWidth: 130
  },
  grid: {
    bottom: 10,
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    marginTop: "auto",
    marginBottom: 30,
    alignSelf: "stretch"
  }
});

export default function BrewSingleCard(props) {
  const { brew } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <img
        src={brew.images.shift()}
        alt="brew img!"
        className={classes.media}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {brew.brewName} review, written by{" "}
          <Link component={RouterLink} to={`/users/${brew.author.id}`}>
            {brew.author.firstName}
          </Link>
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {brew.impressions.length > 200
            ? `${brew.impressions.slice(0, 200)}...`
            : brew.impressions}
        </Typography>
      </CardContent>
      <CardActions className={classes.grid}>
        <div>
          <Link component={RouterLink} to={`/brews/${brew._id}`}>
            <Button size="medium" color="primary">
              Read more
            </Button>
          </Link>
        </div>
        <div>
          <Button size="small" color="primary">
            <AddBoxIcon />
          </Button>
          <Typography variant="h5" component="span">
            {" "}
            {brew.rating}{" "}
          </Typography>
          <Button size="small" color="primary">
            <IndeterminateCheckBoxIcon />
          </Button>
        </div>
      </CardActions>
    </Card>
  );
}

BrewSingleCard.propTypes = {
  brew: PropTypes.objectOf(PropTypes.any).isRequired
};
