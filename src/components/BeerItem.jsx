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
import { Link as RouterLink } from "react-router-dom";

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
  const { beer, id, handleAdd, handleRemove, favorites } = props;
  const haveInFav = favorites.includes(beer.id);
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
            {beer.tagline.length > 40
              ? `${beer.tagline.slice(0, 40)}...`
              : beer.tagline}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          component={RouterLink}
          to={`/beers/${id}`}
          size="small"
          color="primary"
        >
          Open
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={
            favorites.includes(beer.id)
              ? () => {
                  handleRemove(beer.id);
                }
              : () => {
                  handleAdd(beer.id);
                }
          }
        >
          {haveInFav ? (
            <span>Remove from Favorites</span>
          ) : (
            <span>Add to Favorites</span>
          )}
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
  }).isRequired,
  id: PropTypes.number.isRequired,
  handleAdd: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  favorites: PropTypes.arrayOf(PropTypes.number).isRequired
};
