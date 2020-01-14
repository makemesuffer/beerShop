import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  grid: {
    display: "grid",
    margin: "50px auto 0",
    gridTemplateColumns: "repeat(7,50px)",
    justifyContent: "center",
    maxWidth: 450,
    marginBottom: 50
  },
  card: {
    width: "50px",
    textAlign: "left"
  },
  activeCard: {
    backgroundColor: theme.palette.blueSky.main,
    fontWeight: 700
  }
}));

export default function FavoritesPagination(props) {
  const {
    currentPage,
    favoritesBeers,
    currentPageDecrement,
    currentPageIncrement,
    setCurrentPage
  } = props;
  const classes = useStyles();

  // FIXME move it to function and pass it to props
  const predel = Math.ceil(favoritesBeers.length / 5);
  const pageArray = [];
  for (let i = 0; i < predel; i += 1) {
    pageArray.push(i + 1);
  }

  let paginationFinal = [];

  if (pageArray.length > 5) {
    if (currentPage === 1) {
      paginationFinal = pageArray.slice(currentPage - 1, currentPage + 3);
    } else if (currentPage === pageArray.length) {
      paginationFinal = pageArray.slice(currentPage - 3, currentPage + 1);
    } else {
      paginationFinal = pageArray.slice(currentPage - 2, currentPage + 2);
    }
  } else {
    paginationFinal = [...pageArray];
  }

  if (favoritesBeers.length < 6) return null;
  return (
    <div className={classes.grid}>
      <Card className={classes.card}>
        {currentPage !== 1 ? (
          <Button
            onClick={currentPageDecrement}
            component={RouterLink}
            to={`/favorites/${currentPage}`}
          >
            {" "}
            &lt; &lt;{" "}
          </Button>
        ) : (
          <Button onClick={currentPageDecrement} disabled>
            &lt; &lt;
          </Button>
        )}
      </Card>
      {paginationFinal.map(number => {
        return (
          <Card
            key={number}
            className={
              number === currentPage ? classes.activeCard : classes.card
            }
          >
            <Button
              onClick={() => {
                setCurrentPage(number);
              }}
              component={RouterLink}
              to={`/favorites/${number}`}
            >
              {number}
            </Button>
          </Card>
        );
      })}
      <Card className={classes.card}>
        {currentPage !== pageArray.length ? (
          <Button
            onClick={currentPageIncrement}
            component={RouterLink}
            to={`/favorites/${currentPage}`}
          >
            {" "}
            &gt; &gt;{" "}
          </Button>
        ) : (
          <Button onClick={currentPageIncrement} disabled>
            &gt; &gt;
          </Button>
        )}
      </Card>
    </div>
  );
}

FavoritesPagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  favoritesBeers: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentPageIncrement: PropTypes.func.isRequired,
  currentPageDecrement: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired
};
