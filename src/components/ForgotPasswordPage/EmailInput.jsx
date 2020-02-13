import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert/Alert";

const useStyles = makeStyles(theme => ({
  container: {
    textAlign: "center"
  },
  button: {
    marginTop: "2%",
    width: "50%"
  },
  buttonText: {
    color: theme.palette.default.main
  }
}));

export default function EmailInput(props) {
  const {
    handleChange,
    handleSubmit,
    appear,
    error,
    handleCheck,
    handleChangePass,
    pass,
    success
  } = props;
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <Typography variant="h5">Please, enter your email address</Typography>
      {success !== "" ? <Alert severity="success">{success}</Alert> : <></>}
      {error !== "" ? <Alert severity="error">{error}</Alert> : <></>}
      <form>
        <TextField
          name="email"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Email"
          autoFocus
          onChange={handleChange}
        />
        {appear ? (
          <TextField
            name="code"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Confirmation Code"
            onChange={handleChange}
          />
        ) : (
          <></>
        )}
        {pass ? (
          <>
            <TextField
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
              name="repeatPassword"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="password"
              label="Repeat New Password"
              onChange={handleChange}
            />
          </>
        ) : (
          <></>
        )}
        <Button
          type="submit"
          variant="contained"
          className={classes.button}
          color="primary"
          onClick={
            pass ? handleChangePass : appear ? handleCheck : handleSubmit
          }
        >
          {pass ? <span>Change Password</span> : <span>Confirm</span>}
        </Button>
      </form>
    </Container>
  );
}

EmailInput.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  appear: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  handleCheck: PropTypes.func.isRequired,
  handleChangePass: PropTypes.func.isRequired,
  pass: PropTypes.bool.isRequired,
  success: PropTypes.string.isRequired
};
