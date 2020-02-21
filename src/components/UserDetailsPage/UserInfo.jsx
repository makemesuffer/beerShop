import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CakeIcon from "@material-ui/icons/Cake";
import EmailIcon from "@material-ui/icons/Email";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";

import noAvatar from "./assets/noAvatar.png";

const useStyles = makeStyles({
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1.5fr",
    textAlign: "center",
    marginBottom: "3%"
  },
  media: {
    maxWidth: 300,
    maxHeight: 300
  },
  buttons: {
    margin: "20px auto",
    maxWidth: 200
  },
  button: {
    marginTop: 10,
    marginBottom: 10
  },
  secondColumn: {
    maxWidth: "70%",
    margin: "50px auto 0"
  },
  userDescription: {
    marginTop: 30
  },
  dataContainer: {
    display: "grid",
    gridTemplateColumns: "0.3fr 5fr",
    width: "60%",
    margin: "20px auto 0",
    textAlign: "left",
    fontSize: 20
  },
  container: {
    paddingBottom: "2%"
  },
  favBeers: {
    textAlign: "center",
    marginTop: 30
  },
  hide: {
    display: "none"
  }
});

export default function UserInfo(props) {
  const { user, allowed, handleUpload, handleDelete } = props;
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="lg">
      <Card className={classes.container}>
        <div className={classes.grid}>
          <div style={{ textAlign: "center" }}>
            <img
              src={
                user.profilePicture === null ? noAvatar : user.profilePicture
              }
              alt="user"
              className={classes.media}
            />
            <Card className={classes.buttons}>
              {allowed ? (
                <>
                  <input
                    accept="image/*"
                    className={classes.hide}
                    id="raised-button-file"
                    multiple
                    type="file"
                    onChange={handleUpload}
                  />
                  <label htmlFor="raised-button-file">
                    <Button
                      component="span"
                      variant="contained"
                      color="primary"
                      className={classes.button}
                    >
                      Upload image
                    </Button>
                  </label>
                  <Link
                    color="inherit"
                    component={RouterLink}
                    to={`/users/${user.id}/change-password`}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                    >
                      Change Password
                    </Button>
                  </Link>
                  {user.profilePicture === null ? (
                    <></>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={handleDelete}
                    >
                      Delete image
                    </Button>
                  )}
                </>
              ) : (
                <Button variant="contained" color="primary">
                  Add to friends
                </Button>
              )}
            </Card>
          </div>
          <div className={classes.secondColumn}>
            <Typography variant="h4">
              {user.firstName} {user.lastName}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.userDescription}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography>
            <div className={classes.dataContainer}>
              <CakeIcon />
              {moment(user.birthDate).format("LL")}
            </div>
            <div className={classes.dataContainer}>
              <EmailIcon />
              {user.login}
            </div>
            <div className={classes.dataContainer}>
              <CalendarTodayIcon />
              {moment(user.createdAt).format("LL")}
            </div>
          </div>
        </div>
        <Typography variant="h5" className={classes.favBeers}>
          {user.firstName} favorites beers:
        </Typography>
      </Card>
    </Container>
  );
}

UserInfo.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  allowed: PropTypes.bool.isRequired,
  handleUpload: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
};
