import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Popover from "@material-ui/core/Popper";
import { IoIosMore } from "react-icons/all";

import { Link as RouterLink } from "react-router-dom";
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
  dotsContainer: {
    color: theme.palette.whiteMarble.main
  },
  dots: {
    height: "30px",
    width: "30px",
    verticalAlign: "middle",
    transform: "rotate(90deg)"
  }
}));

export default function Header(props) {
  const { toggleMenu, handleClose, auth, anchorEi, handleExit, user } = props;
  const classes = useStyles();
  const open = Boolean(anchorEi);
  const id = open ? "simple-popover" : undefined;

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
          <div>
            <Button
              className={classes.dotsContainer}
              onClick={toggleMenu}
              aria-describedby={id}
            >
              <IoIosMore className={classes.dots} />
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEi}
              anchororigin={{
                vertical: "bottom",
                horizontal: "left"
              }}
              transformorigin={{
                vertical: "top",
                horizontal: "left"
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open}>
                    <MenuItem
                      onClick={handleClose}
                      component={RouterLink}
                      to={auth ? `/users/${user.id}` : "/login"}
                    >
                      {auth ? "My account" : "Sign in"}
                    </MenuItem>
                    <MenuItem
                      onClick={auth ? handleExit : handleClose}
                      component={RouterLink}
                      to={auth ? "/root" : "/sign"}
                    >
                      {auth ? "Logout" : "Sign up"}
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Popover>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Header.propTypes = {
  toggleMenu: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  auth: PropTypes.bool.isRequired,
  handleExit: PropTypes.func.isRequired,
  anchorEi: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.any]),
  user: PropTypes.objectOf(PropTypes.any)
};

Header.defaultProps = {
  anchorEi: null,
  user: null
};
