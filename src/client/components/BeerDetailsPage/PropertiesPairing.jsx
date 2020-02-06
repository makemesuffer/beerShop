import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import InfoPortal from "../../containers/BeerDetailsPage/InfoPortal";

const useStyles = makeStyles(theme => ({
  grid: {
    marginLeft: 20,
    display: "grid",
    gridTemplateColumns: "20% 30%",
    gridColumnGap: "10%"
  },
  title: {
    marginBottom: "10px"
  },
  popper: {
    border: "1px solid",
    padding: theme.spacing(1)
  },
  dot: {
    heigth: 25,
    width: 40,
    borderRadius: "10px",
    display: "inline-block",
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.default.main,
    textAlign: "center"
  }
}));

export default function PropertiesPairing(props) {
  const { beer, createTableData } = props;
  const rows = [
    createTableData("ABV", beer.abv, "ABV stands for alcohol"),
    createTableData("IBU", beer.ibu, "IBU stands for bitterness"),
    createTableData("EBC", beer.ebc, "EBC stands for color")
  ];
  const classes = useStyles();
  return (
    <div className={classes.grid}>
      <div>
        <Typography variant="h5" className={classes.title}>
          Properties
        </Typography>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                    <InfoPortal description={row.description} />
                  </TableCell>
                  <TableCell align="right">
                    <span className={classes.dot}>{row.value}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div>
        <Typography variant="h5" className={classes.title}>
          Food Pairing
        </Typography>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableBody>
              {beer.food_pairing.map(elem => (
                <TableRow key={elem}>
                  <TableCell component="th" scope="row" align="left">
                    {" "}
                    {elem}{" "}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

PropertiesPairing.propTypes = {
  beer: PropTypes.shape({
    abv: PropTypes.number,
    ibu: PropTypes.number,
    ebc: PropTypes.number,
    food_pairing: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  createTableData: PropTypes.func.isRequired
};
