import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert/Alert";

const useStyles = makeStyles(theme => ({
  container: {
    textAlign: "center"
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function ChangePassword(props) {
  const { handleChange, handleSubmit, error, success } = props;
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="sm" className={classes.container}>
      <Typography variant="h4">Enter a new password</Typography>
      {success !== "" ? <Alert severity="success">{success}</Alert> : <></>}
      {error !== "" ? <Alert severity="error">{error}</Alert> : <></>}
      <form className={classes.form} noValidate>
        <TextField
          name="oldPassword"
          variant="outlined"
          margin="normal"
          required
          type="password"
          fullWidth
          label="Old Password"
          autoFocus
          onChange={handleChange}
        />
        <TextField
          autoComplete="fname"
          name="newPassword"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="password"
          label="New Password"
          onChange={handleChange}
        />
        <TextField
          autoComplete="fname"
          name="repeatPassword"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="password"
          label="Repeat New Password"
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="contained"
          className={classes.submit}
          color="primary"
          onClick={handleSubmit}
        >
          Confirm
        </Button>
      </form>
    </Container>
  );
}

ChangePassword.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  success: PropTypes.string.isRequired
};
