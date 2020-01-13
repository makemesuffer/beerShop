import React from "react";
import PropTypes, { object } from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  container: {
    marginTop: "4%",
    marginLeft: 20
  },
  boxContainer: {
    maxWidth: "70%"
  },
  grid: {
    marginTop: "2%",
    display: "grid",
    gridTemplateColumns: "40% 30%",
    gridColumnGap: "10%"
  },
  tableContainer: {
    marginTop: 30,
    marginBottom: 30
  },
  methods: {
    marginTop: 50
  }
});

export default function BrewingInfo(props) {
  const { beer, createData, createSykaData } = props;
  const classes = useStyles();
  const rows = [
    createData("Water", `${beer.volume.value} ${beer.volume.unit}`),
    createData("Malt", beer.ingredients.malt),
    createData("Hops", beer.ingredients.hops),
    createData("Yeast", beer.ingredients.yeast)
  ];
  const rowa = [
    createSykaData("Mash", beer.method.mash_temp),
    createSykaData("Fermentation", beer.method.fermentation),
    createSykaData("Twist", beer.method.twist)
  ];
  return (
    <div className={classes.container}>
      <Box className={classes.boxContainer}>
        <Typography variant="h4">Brewing</Typography>
        <p>{beer.brewers_tips}</p>
      </Box>
      <div className={classes.grid}>
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
                          row.value.map((elem, index) => {
                            return (
                              // eslint-disable-next-line react/no-array-index-key
                              <div key={index}>
                                <p>
                                  {elem.name} - {elem.amount.value}
                                  {elem.amount.unit}
                                  {/* eslint-disable-next-line no-prototype-builtins */}
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
        <div>
          <Typography variant="h5">Method</Typography>
          {rowa.map((row, inda) => {
            return (
              <div key={row.name} className={classes.methods}>
                <Typography variant="h6">{row.name}</Typography>
                {Array.isArray(row.value) ? (
                  row.value.map((elem, index) => {
                    return (
                      // eslint-disable-next-line react/no-array-index-key
                      <p key={index}>
                        {/* eslint-disable-next-line no-nested-ternary */}
                        {inda === 0 ? (
                          <span>
                            {elem.duration} minutes at {elem.temp.value}{" "}
                            {elem.temp.unit === "celsius" ? "C" : "F"}
                          </span>
                        ) : inda === 1 ? (
                          <span>
                            {" "}
                            Perform at {elem.temp.value}{" "}
                            {elem.temp.unit === "celsius" ? "C" : "F"}
                          </span>
                        ) : (
                          <span>{elem}</span>
                        )}
                      </p>
                    );
                  })
                ) : (
                  <p>{row.value}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

BrewingInfo.propTypes = {
  beer: PropTypes.shape({
    brewers_tips: PropTypes.string,
    volume: PropTypes.shape({
      value: PropTypes.number,
      unit: PropTypes.string
    }).isRequired,
    ingredients: PropTypes.shape({
      malt: PropTypes.arrayOf(PropTypes.object),
      hops: PropTypes.arrayOf(PropTypes.object),
      yeast: PropTypes.string
    }).isRequired,
    method: PropTypes.shape({
      mash_temp: PropTypes.arrayOf(PropTypes.object),
      fermentation: PropTypes.objectOf(PropTypes.object),
      // eslint-disable-next-line react/no-typos
      twist: PropTypes.oneOfType([PropTypes.null, PropTypes.arrayOf(object)])
    })
  }).isRequired,
  createData: PropTypes.func.isRequired,
  createSykaData: PropTypes.func.isRequired
};

/*
{Array.isArray(row.value) ? (row.value.map((elem, index) =>{
                  return (
                    <>
<p key={index}>
  {elem.duration} minutes at {elem.temp.value} {elem.temp.unit === "celsius" ? "C" : "F"}
</p>
<>
);
})
) : (
  <p>{row.value}</p>
)}
 */
