import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { CardContent } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  title: {
    textAlign: "center",
    marginBottom: 50
  },
  noFav: {
    textAlign: "center",
    marginTop: 50,
    color: theme.palette.danger.main
  },
  cardGrid: {
    display: "grid",
    gridTemplateRows: "1fr",
    gridRowGap: "50px",
    justifyContent: "center"
  },
  card: {
    width: "800px",
    display: "grid",
    gridTemplateColumns: "3fr 1fr",
    gridTemplateRows: "3fr 1fr"
  },
  beerName: {
    fontSize: 20,
    fontWeight: 700
  },
  tagLine: {
    fontStyle: "italic",
    marginTop: -15,
    color: theme.palette.secondary.main
  },
  image: {
    height: 160,
    width: 50,
    alignSelf: "end",
    marginLeft: 50
  }
}));

export default function FavoritesCard(props) {
  const { favoritesBeers, currentPage } = props;
  // FIXME move to props
  const index = currentPage === 1 ? 0 : (currentPage - 1) * 5;
  const beers = favoritesBeers.slice(index, index + 5);
  const classes = useStyles();
  return (
    <div>
      <Typography variant="h2" className={classes.title}>
        Your favorite beers
      </Typography>
      <div className={classes.cardGrid}>
        {beers.length > 0 ? (
          beers.map(elem => {
            return (
              <Card key={elem.id} className={classes.card}>
                <CardContent>
                  <p className={classes.beerName}> {elem.name}</p>
                  <p className={classes.tagLine}> {elem.tagline} </p>
                  <p>{elem.description}</p>
                </CardContent>
                <CardContent>
                  <CardMedia
                    image={elem.image_url}
                    title="pivandopalo"
                    className={classes.image}
                  />
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    component={RouterLink}
                    to={`/beers/${elem.id}`}
                  >
                    Open
                  </Button>
                  <Button size="small" color="primary">
                    Remove Favorite
                  </Button>
                </CardActions>
              </Card>
            );
          })
        ) : (
          <Typography variant="h4" className={classes.noFav}>
            Нет любимого пива
          </Typography>
        )}
      </div>
    </div>
  );
}

FavoritesCard.propTypes = {
  favoritesBeers: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentPage: PropTypes.number.isRequired
};
