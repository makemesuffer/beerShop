import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

const useStyles = makeStyles({
  tableContainer: {
    marginTop: 30,
    marginBottom: 30
  }
});

export default function Ingredients(props) {
  const { rows } = props;
  const classes = useStyles();
  return (
    <div>
      <Typography variant="h5">Ingredients</Typography>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table aria-label="simple table">
          <TableBody>
            {rows.map(row => {
              return (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="column">
                    <Typography variant="h6">{row.name}</Typography>
                    {Array.isArray(row.value) ? (
                      row.value.map(elem => {
                        return (
                          <div key={`${elem.name} - ${elem.add}`}>
                            <p>
                              {elem.name} - {elem.amount.value}
                              {elem.amount.unit}
                              {elem.hasOwnProperty("add")
                                ? ` add when ${elem.add}`
                                : null}
                            </p>
                          </div>
                        );
                      })
                    ) : (
                      <p>{row.value}</p>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

Ingredients.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object).isRequired
};
