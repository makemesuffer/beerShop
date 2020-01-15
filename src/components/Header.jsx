import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { IoIosMore } from "react-icons/all";

import NavigationContainer from "../containers/Navigation.container";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(4)
  },
  logo: {
    marginLeft: theme.spacing(5)
  },
  navigation: {
    flexGrow: 1
  },
  dots: {
    height: "30px",
    width: "30px",
    verticalAlign: "middle",
    transform: "rotate(90deg)"
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <NavigationContainer />
          <Box className={classes.navigation}>
            <Typography variant="h6" className={classes.logo}>
              Beer сatalog
            </Typography>
          </Box>
          <IoIosMore className={classes.dots} />
        </Toolbar>
      </AppBar>
    </div>
  );
}
