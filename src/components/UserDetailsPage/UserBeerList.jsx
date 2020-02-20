import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { CardContent } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: "2%"
  },
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
    gridTemplateColumns: "1fr 1fr 1fr",
    gridRowGap: "10px",
    justifyContent: "center"
  },
  card: {
    width: "400px",
    display: "grid",
    gridTemplateColumns: "0.3fr 2fr"
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
    height: 120,
    width: 36,
    alignSelf: "end",
    marginLeft: 20
  }
}));

export default function UserBeerList(props) {
  const {
    beers,
    favoritesBeers,
    handleRemove,
    currentPageDecrement,
    allowed
  } = props;
  const classes = useStyles();

  useEffect(() => {
    if (beers.length === 0 && favoritesBeers.length > 0) currentPageDecrement();
  });

  return (
    <Container component="main" maxWidth="lg" className={classes.container}>
      <Card>
        <div className={classes.cardGrid}>
          {beers.map(elem => {
            return (
              <Card key={elem.id} className={classes.card}>
                <CardContent>
                  <CardMedia
                    image={elem.image_url}
                    title="pivandopalo"
                    className={classes.image}
                  />
                </CardContent>
                <CardContent>
                  <p className={classes.beerName}> {elem.name}</p>
                  <p className={classes.tagLine}> {elem.tagline} </p>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      component={RouterLink}
                      to={`/beers/${elem.id}`}
                    >
                      Open
                    </Button>
                    {allowed ? (
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => {
                          handleRemove(elem.id);
                        }}
                      >
                        Remove Favorite
                      </Button>
                    ) : (
                      <></>
                    )}
                  </CardActions>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Card>
    </Container>
  );
}

UserBeerList.propTypes = {
  beers: PropTypes.arrayOf(PropTypes.object).isRequired,
  favoritesBeers: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentPageDecrement: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  allowed: PropTypes.bool.isRequired
};
