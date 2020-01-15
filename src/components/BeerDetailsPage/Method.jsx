import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  methods: {
    marginTop: 50
  }
});

export default function Method(props) {
  const { rows } = props;
  const classes = useStyles();
  return (
    <div>
      <Typography variant="h5">Method</Typography>
      {rows.map((row, index) => {
        return (
          <div key={row.name} className={classes.methods}>
            <Typography variant="h6">{row.name}</Typography>
            {Array.isArray(row.value) ? (
              row.value.map(elem => {
                return (
                  <p
                    key={
                      index === 0
                        ? elem.duration + elem.temp.value
                        : { ...elem }
                    }
                  >
                    {index === 0 ? (
                      <span>
                        {elem.duration} minutes at {elem.temp.value}{" "}
                        {elem.temp.unit === "celsius" ? "C" : "F"}
                      </span>
                    ) : index === 1 ? (
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
  );
}

Method.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object).isRequired
};
