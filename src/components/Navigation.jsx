import * as React from "react";
// import { Link } from "react-router-dom";
// import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";
import { IoIosMenu } from "react-icons/all";

const useStyles = makeStyles(theme => ({
  menu: {
    color: theme.palette.default.main,
    height: "30px",
    width: "30px",
    verticalAlign: "middle"
  }
}));

const Navigation = () => {
  const classes = useStyles();
  return <IoIosMenu className={classes.menu} />;
};

// TODO: потом подумай че с навигацией делать мб порталы хз хз
/*
<Link className={classes.link} to={routes.teams}>
            Teams
          </Link>
 */

export default Navigation;
