import React from "react";
import PropTypes from "prop-types";
import { YMaps, Map } from "react-yandex-maps";
import { makeStyles } from "@material-ui/core/styles";
import { IoIosBeer } from "react-icons/all";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    backgroundColor: theme.palette.primary.main
  },
  heading: {
    marginTop: 30,
    paddingBottom: 20,
    borderBottom: "1px solid black",
    width: "80%"
  },
  titleHeading: {
    alignSelf: "start",
    marginLeft: 30,
    marginTop: 20
  },
  hint: {
    marginTop: 20,
    marginBottom: -10
  },
  input: {
    marginTop: 20,
    marginBottom: 20,
    width: "80%"
  },
  mapContainer: {
    marginTop: 20,
    marginBottom: 20
  },
  map: {
    width: 400,
    height: 250
  },
  imagePreview: {
    textAlign: "center",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridGap: 10
  },
  hide: {
    display: "none"
  },
  button: {
    marginTop: 20,
    width: 200,
    marginBottom: 20
  },
  img: {
    width: 200,
    height: 200
  }
}));

export default function BrewInput(props) {
  const {
    beerNames,
    handleChange,
    handleMapClick,
    location,
    photos,
    handleUpload,
    beerTypes,
    handleSubmit
  } = props;
  const classes = useStyles();
  return (
    <Paper className={classes.container}>
      <Avatar className={classes.avatar}>
        <IoIosBeer />
      </Avatar>
      <Typography component="h4" variant="h4" className={classes.heading}>
        Tell us about your brew experience!
      </Typography>

      <Typography component="p" variant="h6" className={classes.titleHeading}>
        What is brew name?
      </Typography>
      <Alert severity="info" className={classes.hint}>
        Start typing to get a list of names
      </Alert>
      <Autocomplete
        options={beerNames}
        getOptionLabel={option => option.name}
        className={classes.input}
        onChange={handleChange}
        name="brewName"
        renderInput={params => (
          <TextField
            {...params}
            variant="outlined"
            label="Brew Name"
            fullWidth
            name="brewName"
            onChange={handleChange}
          />
        )}
      />

      <Typography component="p" variant="h6" className={classes.titleHeading}>
        Where did you taste this brew?
      </Typography>
      <div className={classes.mapContainer}>
        <YMaps>
          <Map
            defaultState={{ center: [53.902496, 27.561481], zoom: 10 }}
            onClick={handleMapClick}
            className={classes.map}
          />
        </YMaps>
      </div>
      <TextField
        variant="outlined"
        label="Location"
        fullWidth
        name="location"
        onChange={handleChange}
        className={classes.input}
        value={location === "" ? "" : location}
      />

      <Typography component="p" variant="h6" className={classes.titleHeading}>
        Did you picture that moment?
      </Typography>
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
      <div className={classes.imagePreview}>
        {photos.map(photo => {
          return <img src={photo} alt="boje moi" className={classes.img} />;
        })}
      </div>

      <Typography component="p" variant="h6" className={classes.titleHeading}>
        Share your opinion about this brew
      </Typography>
      <TextField
        label="Your opinion"
        name="impressions"
        variant="outlined"
        multiline
        className={classes.input}
        onChange={handleChange}
      />

      <Typography component="p" variant="h6" className={classes.titleHeading}>
        What is the type of the beer?
      </Typography>
      <Autocomplete
        options={beerTypes}
        className={classes.input}
        renderInput={params => (
          <TextField
            {...params}
            variant="outlined"
            label="Brew Type"
            fullWidth
            name="brewType"
            onChange={handleChange}
          />
        )}
      />

      <Button className={classes.button} onClick={handleSubmit}>
        Submit
      </Button>
    </Paper>
  );
}

BrewInput.propTypes = {
  beerNames: PropTypes.arrayOf(PropTypes.object),
  handleChange: PropTypes.func.isRequired,
  handleMapClick: PropTypes.func.isRequired,
  location: PropTypes.string.isRequired,
  photos: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleUpload: PropTypes.func.isRequired,
  beerTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleSubmit: PropTypes.func.isRequired
};

BrewInput.defaultProps = {
  beerNames: []
};
