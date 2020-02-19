import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { IoIosBeer } from "react-icons/all";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(8)
  },
  paper: {
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  hide: {
    display: "none"
  }
}));

export default function BrewForm() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="md" className={classes.container}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <IoIosBeer />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add a new brew
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="brewName"
                variant="outlined"
                required
                fullWidth
                label="Brew Name"
                // autocomplete from beerName array list
              />
            </Grid>
            <Grid item xs={12}>
              <div>
                <input
                  accept="image/*"
                  className={classes.hide}
                  id="raised-button-file"
                  multiple
                  type="file"
                  // onChange={handleUpload}
                />
                <label htmlFor="raised-button-file">
                  <Button
                    component="span"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    Upload images
                  </Button>
                </label>
              </div>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Your Impressions"
                name="impressions"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="beerType"
                label="Beer Type"
                // autocomplete from beerType array list of types
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Add a new Brew
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
