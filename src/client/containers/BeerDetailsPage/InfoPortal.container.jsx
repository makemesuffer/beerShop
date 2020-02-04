import React from "react";
import PropTypes from "prop-types";
import Portal from "@material-ui/core/Portal";
import { makeStyles } from "@material-ui/core/styles";
import { FiInfo } from "react-icons/fi";

const useStyles = makeStyles(theme => ({
  iconContainer: {
    display: "inline-block",
    position: "relative"
  },
  icon: {
    marginLeft: 10,
    width: 15,
    height: 15,
    color: theme.palette.secondary.main
  },
  alert: {
    position: "absolute",
    top: 0,
    left: 30,
    width: 150
  },
  text: {
    fontSize: 10,
    color: theme.palette.secondary.main
  }
}));

export default function InfoPortalContainer(props) {
  const { description } = props;
  const classes = useStyles();
  const [show, setShow] = React.useState(false);
  const container = React.useRef(null);

  const handleHover = () => {
    setShow(true);
  };

  const handleUnhover = () => {
    setShow(false);
  };

  return (
    <div className={classes.iconContainer}>
      <FiInfo
        className={classes.icon}
        onMouseOver={handleHover}
        onMouseOut={handleUnhover}
        onFocus={handleHover}
        onBlur={handleUnhover}
      />{" "}
      {show ? (
        <Portal container={container.current}>
          <div className={classes.alert}>
            <span className={classes.text}>{description}</span>
          </div>
        </Portal>
      ) : null}
      <div ref={container} />
    </div>
  );
}

InfoPortalContainer.propTypes = {
  description: PropTypes.string.isRequired
};
