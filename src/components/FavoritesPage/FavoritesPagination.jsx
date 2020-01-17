import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { Link as RouterLink, Redirect } from "react-router-dom";

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
    pageArray,
    paginationFinal,
    currentPageDecrement,
    currentPageIncrement,
    setCurrentPage,
    currentPage
  } = props;
  const classes = useStyles();

  if (paginationFinal.length <= 1) {
    return <Redirect to={`/favorites/${currentPage}`} />;
  }

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
  pageArray: PropTypes.arrayOf(PropTypes.number).isRequired,
  currentPage: PropTypes.number.isRequired,
  paginationFinal: PropTypes.arrayOf(PropTypes.number).isRequired,
  currentPageIncrement: PropTypes.func.isRequired,
  currentPageDecrement: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired
};
