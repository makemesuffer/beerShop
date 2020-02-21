import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles(theme => ({
  container: {
    textAlign: "center"
  },
  button: {
    marginTop: "2%",
    width: "40%"
  },
  buttonText: {
    color: theme.palette.default.main
  }
}));

export default function Verify() {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="md" className={classes.container}>
      <Typography variant="h3">Email was confirmed</Typography>
      <Link color="inherit" component={RouterLink} to="/login">
        <Button variant="contained" className={classes.button} color="primary">
          Login
        </Button>
      </Link>
    </Container>
  );
}
