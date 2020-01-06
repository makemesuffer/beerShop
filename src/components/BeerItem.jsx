import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    maxHeight: 345
  },
  media: {
    height: 140
  }
});

export default function BeerItem(props) {
  const classes = useStyles();
  const { beer } = props;
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={beer.image_url}
          title="Pivas"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {beer.name.length > 20 ? `${beer.name.slice(0, 20)}...` : beer.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {beer.tagline}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Open
        </Button>
        <Button size="small" color="primary">
          Favorite
        </Button>
      </CardActions>
    </Card>
  );
}

BeerItem.propTypes = {
  beer: PropTypes.shape({
    image_url: PropTypes.string,
    id: PropTypes.number,
    name: PropTypes.string,
    tagline: PropTypes.string
  }).isRequired
};
