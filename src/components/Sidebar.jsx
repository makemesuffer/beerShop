import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { IoIosMenu, IoIosBeer, IoIosStar } from "react-icons/all";

import { Link as RouterLink } from "react-router-dom";

import routes from "../routing/mainRoutes";

const useStyles = makeStyles(theme => ({
  list: {
    width: 250
  },
  menu: {
    color: theme.palette.default.main,
    height: "30px",
    width: "30px",
    verticalAlign: "middle"
  },
  catalog: {
    height: "200px",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.default.main,
    marginTop: "-70px"
  },
  listItemText: {
    fontSize: "22px"
  }
}));

export default function Sidebar(props) {
  const classes = useStyles();
  const { showMenu, handleNavigation } = props;

  const sideList = () => (
    <div className={classes.list} role="presentation">
      <List>
        <ListItem className={classes.catalog}>
          <ListItemText
            primary="Beer Catalog"
            classes={{ primary: classes.listItemText }}
          />
        </ListItem>
        {["Home", "Favorites"].map((text, index) => (
          <ListItem
            button
            key={text}
            component={RouterLink}
            to={index % 2 === 0 ? routes.search : routes.favorites}
          >
            <ListItemIcon>
              {index % 2 === 0 ? <IoIosBeer /> : <IoIosStar />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <IoIosMenu
        className={classes.menu}
        onClick={() => {
          handleNavigation(true);
        }}
      />
      <Drawer
        open={showMenu}
        onClose={() => {
          handleNavigation(false);
        }}
      >
        {sideList()}
      </Drawer>
    </div>
  );
}

Sidebar.propTypes = {
  handleNavigation: PropTypes.func.isRequired,
  showMenu: PropTypes.bool.isRequired
};
